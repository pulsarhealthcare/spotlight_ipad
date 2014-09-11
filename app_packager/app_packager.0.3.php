<?php
$appPackager = new AppPackager;

if (isset($_GET['type'])) {
    switch ($_GET['type']) {
        case 'slide':
            $appPackager->init();
            $appPackager->packageSlide($_GET['presentation'], $_GET['slide']);
            break;

        case 'presentation':
            $appPackager->init();
            $appPackager->packagePresentation($_GET['presentation']);
            break;

        case 'application':
            $appPackager->init();
            $appPackager->packageApp();
            break;

        case 'getPresentations':
            echo $appPackager->returnPresentationsJSON();
            break;
    }
}

unset($appPackager);

class AppPackager
{
    
    //Application globals
    public $root;
    public $os;
    
    public $temporaryDirectory;
    public $globalFolder;
    public $packagedDirectory;
    public $globalAssets;
    public $slidesPackaged;
    public $scanIgnore;
    
    public function __construct() {
        //Delete last package

        //Set application globals
        $this->root = $_SERVER["DOCUMENT_ROOT"];
        $this->temporaryDirectory = $this->root . '/temporary';
        $this->globalFolder = $this->root . '/global';
        $this->packagedDirectory = $this->root . '/packaged/' . basename(__DIR__) . '_' . date('ymds_Hi');
        $this->slidesPackaged = array();
        $this->scanIgnore = array('.', '..', '.DS_Store');
        
        if (preg_match('/Macintosh/', $_SERVER['HTTP_USER_AGENT'] . "\n\n")) {
            $this->os = 'mac';
        } else {
            $this->os = 'win';
        }
    }
    
    public function init() {

        //Create temporaary directory
        if (is_dir($this->temporaryDirectory)) {
            unlinkRecursive($this->temporaryDirectory, true);
        }
        if(!is_dir($this->temporaryDirectory)){
            mkdir($this->temporaryDirectory);
        }
        
        
        //Create folder for packaged app
        if (!is_dir($this->root . '/packaged')) {
            mkdir($this->root . '/packaged');
        }
        mkdir($this->packagedDirectory);
        $this->globalAssets = $this->prepareGlobalAssets();
    }
    
    public function __destruct() {
        unlinkRecursive($this->temporaryDirectory, true);
    }
    
    public function prepareGlobalAssets() {
        
        $files = scandir($this->globalFolder . '/html/');
        $parsedHtml = array();
        
        for ($x = 2; $x < count($files); $x++) {
            if (!in_array($files[$x], $this->scanIgnore)) {
                $contents = file_get_contents($this->globalFolder . '/html/' . $files[$x]);
                $parsedContents = str_replace('/global/', '', $contents);
                $fileArray = array($files[$x], $parsedContents);
                array_push($parsedHtml, $fileArray);
            }
        }
        
        $globalFolders = scandir($this->globalFolder);
        
        $folderPaths = array();
        
        for ($x = 2; $x < count($globalFolders); $x++) {
            
            if ($globalFolders[$x] != 'html' && $globalFolders[$x] != '.DS_Store' && $globalFolders[$x] != 'pdf_images') {
                $thisFolder = scandir($this->globalFolder . '/' . $globalFolders[$x]);
                array_push($folderPaths, $globalFolders[$x]);
            }

        }
        return array($folderPaths, $parsedHtml);
    }
    
    public function returnPresentationsJSON() {
        $presentations = scandir('../presentations');
        
        $presentationArray = array();
        
        foreach ($presentations as $presentation) {
            
            if (!in_array($presentation, $this->scanIgnore)) {
                $thisPresentation = array($presentation);
                $slides = scandir('../presentations/' . $presentation);
                $theseSlides = array();
                foreach ($slides as $slide) {
                    if (!in_array($slide, $this->scanIgnore)) {
                        array_push($theseSlides, $slide);
                    }
                }
                array_push($thisPresentation, $theseSlides);
                array_push($presentationArray, $thisPresentation);
            }
        }
        
        return json_encode($presentationArray);
    }
    
    public function packageApp() {
        $presentations = scandir($this->root . '/presentations');
        
        foreach ($presentations as $presentation) {
            if (!in_array($presentation, $this->scanIgnore)) {
                $this->packagePresentation($presentation);
            }
        }
    }
    
    public function packagePresentation($presentation) {
        
        $slides = scandir($this->root . '/presentations/' . $presentation);
        
        foreach ($slides as $slide) {
            
            if (!in_array($slide, $this->scanIgnore)) {
                
                $this->packageSlide($presentation, $slide);
            }
        }
    }
    
    public function packageSlide($presentation, $slide) {
        
        //Create presentation folder if non exists
        $presentationFolder = $this->packagedDirectory . '/' . $presentation;
        if (!is_dir($presentationFolder)) {
            mkdir($presentationFolder);
        }
        
        //Create temporary copy of slide
        $slideFolder = $this->root . '/presentations/' . $presentation . '/' . $slide;
        $temporarySlideFolder = $this->temporaryDirectory . '/' . $presentation . '/' .$presentation  .'_'.$slide;
        
        if (!is_dir($this->temporaryDirectory . '/' . $presentation)) {
            mkdir($this->temporaryDirectory . '/' . $presentation);
        }
        
        recurse_copy($slideFolder, $temporarySlideFolder);
        
        //Copy global files into slide directory
        foreach ($this->globalAssets[0] as $folder) {
            recurse_copy($this->globalFolder . '/' . $folder, $temporarySlideFolder . '/' . $folder);
        }
        
        //Copy relevant PDFs 
        
        //Get product name 
        $productProduct = substr($presentation, 16);

        $allPdfs = scandir($this->globalFolder.'/pdf_images');

        $relPdfs = array();
        
        foreach ($allPdfs as $pdf) {

            if (!in_array($pdf, $this->scanIgnore)) {
                if(preg_match('/'.$productProduct.'/', $pdf)) {
                   array_push($relPdfs, $pdf );
                }
            }
        }

        $nonProducts = ['01_presentation_what_is_spotlight','02_presentation_potential_savings','03-presentation_the_spotlight_brands','14_presentation_price_promise','15_presentation_summary','16_presentation_calculator'];

        if(!count($relPdfs)) {

               if(in_array($presentation, $nonProducts)) {
                    foreach ($allPdfs as $pdf) {
                        
                        if (!in_array($pdf, $this->scanIgnore)) {
                            array_push($relPdfs, $pdf);
                        }
                    } 
               }
           
        }
        
        
        //Copy relevant pdfs across
        mkdir($temporarySlideFolder .  '/pdf_images');
        foreach ($relPdfs as $folder) {
           recurse_copy($this->globalFolder . '/pdf_images/' . $folder, $temporarySlideFolder . '/pdf_images/' . $folder);
        }

        //Parse HTMl and add to temporary folder
        
        $index = file_get_contents($temporarySlideFolder . '/index.php');
        
        $index = $this->parseHTML($index);
        
        $index = str_replace('</body>', '<p style="display:none" id="presentation_name">' . $presentation . '</p></body>', $index);
        file_put_contents($temporarySlideFolder . '/' .$presentation  .'_'.$slide. '.html', $index);
        
        unlink($temporarySlideFolder . '/index.php');
        
        //Zip folder
        
        if ($this->zipFolder($temporarySlideFolder, $slide, $presentationFolder, $presentation)) {
        }
    }
    
    public function parseHTML($file) {
        $file = str_replace("<?php require", "", $file);
        $file = str_replace(";?>", "", $file);
        $file = str_replace("<?php", "", $file);
        $file = str_replace('$root = $_SERVER["DOCUMENT_ROOT"]', "", $file);
        $file = str_replace('$root.', "", $file);
        $file = str_replace("", "", $file);
        $file = str_replace("'/global/html/header.html'", $this->globalAssets[1][1][1], $file);
        $file = str_replace("'/global/html/menu.html'", $this->globalAssets[1][2][1], $file);
        $file = str_replace("'/global/html/footer.html'", $this->globalAssets[1][0][1], $file);
        return $file;
    }
    
    public function zipFolder($folder, $slide, $packagedFolder, $presentation) {

        $filename = $packagedFolder . '/' .$presentation  .'_'.$slide. '.zip';
        $ctlFile = 'USER=cloader@veeva.partner23.pulsar \n PASSWORD=pulsar1234 \n EMAIL=veeva@pulsarhealthcare.com \n FILENAME='.$presentation.'_'.$slide.'.zip';
        if(!is_dir($packagedFolder.'/ctl')) {
           mkdir($packagedFolder.'/ctl');  
        }
       
        file_put_contents($packagedFolder.'/ctl/'.$presentation.'_'.$slide.'.ctl', $ctlFile);
        
        if ($this->os == 'mac') {
            exec('cd ' . $folder . ' && cd .. && ls && zip -r ' . $filename . ' '.$presentation.'_'.$slide, $return);
            //exec('cd ' . $folder . ' && cd .. && ls ' , $return);
            //echo var_dump($return);
        } else {
            if (exec('cd c:\program files\winrar\ && winrar a -afzip -ep1 ' . $filename . ' ' . $folder)) {
                return true;
            }
        }
    }
}

function recurse_copy($src, $dst) {
    
    if (!preg_match('/.DS_Store/', $src) && !preg_match('/.DS_Store/', $dst)) {
        $dir = opendir($src);
        @mkdir($dst);
        while (false !== ($file = readdir($dir))) {
            if (($file != '.') && ($file != '..' && $file != '.DS_Store')) {
                if (is_dir($src . '/' . $file)) {
                    recurse_copy($src . '/' . $file, $dst . '/' . $file);
                } else {
                    copy($src . '/' . $file, $dst . '/' . $file);
                }
            }
        }
        closedir($dir);
    }
}

function unlinkRecursive($dir, $deleteRootToo) {
    if (!$dh = @opendir($dir)) {
        return;
    }
    while (false !== ($obj = readdir($dh))) {
        if ($obj == '.' || $obj == '..') {
            continue;
        }
        
        if (!@unlink($dir . '/' . $obj)) {
            unlinkRecursive($dir . '/' . $obj, true);
        }
    }
    
    closedir($dh);
    
    if ($deleteRootToo) {
        @rmdir($dir);
    }
    
    return;
}
?>
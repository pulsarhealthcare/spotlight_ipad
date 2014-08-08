<?php

$appPackager = new AppPackager;

//$appPackager->packagePresentation('06_presentation_filnarine');
//$appPackager->packageSlide('06_presentation_filnarine','01_slide_introduction');
$appPackager->packageApp();

unset($appPackager);
class AppPackager
{
    
    //Application globals

    public $root;
    public $temporaryDirectory;
    public $globalFolder;
    public $packagedDirectory;
    public $globalAssets;
    public $functionZipArray;
    public $slidesPackaged;

    public function __construct() {
        
        //Set application globals

        $this->root = $_SERVER["DOCUMENT_ROOT"];
        $this->temporaryDirectory = $this->root . '/temporary';
        $this->globalFolder = $this->root . '/global';
        $this->packagedDirectory = $this->root . '/packaged';
        $this->globalAssets = $this->prepareGlobalAssets();
        $this->slidesPackaged = array();

        //Create temporaary directory

        if (is_dir($this->temporaryDirectory)) {
            unlinkRecursive($this->temporaryDirectory, true);
        }
        
        mkdir($this->temporaryDirectory); 
        echo 'Temporary directory created.<br>';

        //Create folder for packaged app 

        if(!is_dir($this->root.'/packaged')){
        	mkdir($this->root.'/packaged');
        }
    }

    public function __destruct() {
           unlinkRecursive($this->temporaryDirectory, true);
    }
    
    public function prepareGlobalAssets() {
        
        $files = scandir($this->globalFolder . '/html/');
        $parsedHtml = array();
        
        for ($x = 2; $x < count($files); $x++) {
            $contents = file_get_contents($this->globalFolder . '/html/' . $files[$x]);
            $parsedContents = str_replace('/global/', '', $contents);
            $fileArray = array($files[$x], $parsedContents);
            array_push($parsedHtml, $fileArray);
        }
        
        $globalFolders = scandir($this->globalFolder);
        
        $folderPaths = array();
        
        for ($x = 2; $x < count($globalFolders); $x++) {
            
            if ($globalFolders[$x] != 'html'  && $globalFolders[$x] != '.DS_Store' ) {
                
                $thisFolder = scandir($this->globalFolder .'/'. $globalFolders[$x]);
                array_push($folderPaths, $globalFolders[$x]);
            }
        }
        echo 'Global assets prepared.<br>';
        return array($folderPaths, $parsedHtml);
    }
    
    

    public function packageApp() {
    	$presentations = scandir($this->root.'/presentations');

    	foreach ($presentations as $presentation) {
    		if($presentation != '.' && $presentation != '..' && $presentation != '.DS_Store') {

    			$this->packagePresentation($presentation);
    		}
    		
           
    	}
    }
    
    public function packagePresentation($presentation) {
        
        $slides = scandir($this->root.'/presentations/'.$presentation);
        
        $packagedFolder = $this->packagedDirectory.'/'.$presentation.'_'.date('hisdmy');
        mkdir($packagedFolder);

        foreach ($slides as $slide) {
            if($slide != '.' && $slide != '..' && $slide != '.DS_Store'){
                $this->packageSlide($presentation,$slide,$packagedFolder);
            }
        }
    }

    public function packageSlide($presentation, $slide, $packagedFolder) {
    	
    	//Create temporary copy of slide
		
		$slideFolder = $this->root . '/presentations/' . $presentation . '/' . $slide;
		$temporarySlideFolder = $this->temporaryDirectory . '/' . $presentation . '/' . $slide;

        if (!is_dir($this->temporaryDirectory . '/' . $presentation)) {
	        mkdir($this->temporaryDirectory . '/' . $presentation);
        }

        recurse_copy($slideFolder, $temporarySlideFolder);
        
		//Copy global files into slide directory
        foreach ($this->globalAssets[0] as $folder) {
	       recurse_copy($this->globalFolder .'/'. $folder, $temporarySlideFolder . '/' . $folder);
	    }

	    //Parse HTMl and add to temporary folder
		$index = file_get_contents($temporarySlideFolder . '/index.php');
        
        $index = $this->parseHTML($index);
        
        file_put_contents($temporarySlideFolder. '/' . $slide . '.html', $index);
        
        unlink($temporarySlideFolder . '/index.php');

        //Zip folder
        
        $this->zipFolder($temporarySlideFolder,$slide,$packagedFolder);

    }

    public function parseHTML($file) {
        $file = str_replace("<?php require", "", $file);
	    $file = str_replace(";?>", "", $file);
	    $file = str_replace("<?php", "", $file);
	    $file = str_replace('$root = $_SERVER["DOCUMENT_ROOT"]', "", $file);
	    $file = str_replace('$root.', "", $file);
	    $file = str_replace("", "", $file);
	    $file = str_replace('/global/html/header.html', $this->globalAssets[1][1][1], $file);
	    $file = str_replace('/global/html/menu.html', $this->globalAssets[1][2][1], $file);
	    $file = str_replace('/global/html/footer.html', $this->globalAssets[1][0][1], $file);
        return $file;
    }

    public function zipFolder($folder,$slide, $packagedFolder) {
        $zip = new ZipArchive();
        
        $this->zipArray = array();

        $filename = $packagedFolder.'/'.$slide.'.zip';
        
        if ($zip->open($filename, ZipArchive::CREATE)!==TRUE) {
               exit("cannot open <$filename>\n");
        }
        
        $this->recursiveDirectoryScan($folder,array($this,'addFileToZip'));

        $rootDirectoryLength = strlen($folder) + 1;
        
        foreach ($this->zipArray as $file) {
            $zip->addFile($file,substr($file,$rootDirectoryLength));
        }

        $zip->close();
        
    }
    
    public function addFileToZip($folder,$file) {
    	   array_push($this->zipArray, $folder.'/'.$file);
    }

    public function recursiveDirectoryScan($folder,$callback) {
    	$fileList = scandir($folder);
        foreach ($fileList as $file) {
        	if($file != '.' && $file != '..' && $file != '.DS_STORE') {
                if(!is_dir($folder.'/'.$file)) {
                 	$callback($folder,$file);  
                } else {
                 	$this->recursiveDirectoryScan($folder.'/'.$file,$callback);
                }
            }
        }
    }

}


function recurse_copy($src, $dst) {
	
	if(!preg_match('/.DS_Store/', $src) &&   !preg_match('/.DS_Store/', $dst)) {

	
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
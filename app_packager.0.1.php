<?php

$root = $_SERVER["DOCUMENT_ROOT"];
$temporaryDirectory = $root . '/tempory';
$globalAssets = setUpGlobalFiles($root,$temporaryDirectory);
init($root,$temporaryDirectory);
var_dump($globalAssets);
packageSlide('01_presentation_what_is_spotlight','00_slide_what_is_spotlight',$globalAssets,$temporaryDirectory,$root);


function init($root, $temporaryDirectory) {
    if (is_dir($temporaryDirectory)) {
       unlinkRecursive($temporaryDirectory, true);
    }
    mkdir($temporaryDirectory);
}

function setUpGlobalFiles($root, $temporaryDirectory) {
    
    $globalFolder = $root . '/global/';
    
    $files = scandir($globalFolder . '/html/');
    
    $parsedHtml = array();
    
    for ($x = 2; $x < count($files); $x++) {
        $contents = file_get_contents($globalFolder . '/html/' . $files[$x]);
        $parsedContents = str_replace('/global/', '', $contents);
        $fileArray = array($files[$x], $parsedContents);
        array_push($parsedHtml, $fileArray);
    }
    
    $globalFolders = scandir($globalFolder);
    
    $folderPaths = array();
    
    for ($x = 2; $x < count($globalFolders); $x++) {
        
        if ($globalFolders[$x] != 'html') {
            
            $thisFolder = scandir($globalFolder . $globalFolders[$x]);
            array_push($folderPaths, $globalFolders[$x]);
        }
    }
    
    return array($folderPaths, $parsedHtml);
}

function packageSlide($presentation, $slide, $globalAssets, $temporaryDirectory, $root) {
	
	//Create temporary copy of slide
    $slideFolder = $root.'/presentations/'.$presentation.'/'.$slide;

    if (!is_dir($temporaryDirectory.'/'.$presentation)) {
         mkdir($temporaryDirectory.'/'.$presentation);
    }
    recurse_copy($slideFolder, $temporaryDirectory.'/'.$presentation.'/'.$slide);

    //Copy global files into slide directory

    foreach ($globalAssets[0] as $folder) {
        recurse_copy($root.'/global/'.$folder , $temporaryDirectory.'/'.$presentation.'/'.$slide.'/'.$folder);
    }
    
    //Parse html files, add html 
    $index = file_get_contents($temporaryDirectory.'/'.$presentation.'/'.$slide.'/index.php');
    
    $index = str_replace("<?php require","",$index);
    $index = str_replace(";?>","",$index);
    $index = str_replace("<?php","",$index);
    $index = str_replace('$root = $_SERVER["DOCUMENT_ROOT"]',"",$index);
    $index = str_replace('$root.',"",$index);
    $index = str_replace("","",$index);

    $index = str_replace('/global/html/header.html' ,$globalAssets[1][1][1], $index);
    $index = str_replace( '/global/html/menu.html' ,$globalAssets[1][2][1], $index);
    $index = str_replace( '/global/html/footer.html' ,$globalAssets[1][0][1], $index);
    
    file_put_contents($temporaryDirectory.'/'.$presentation.'/'.$slide.'/'.$slide.'.html', $index);

    //Zip slide

    unlink($temporaryDirectory.'/'.$presentation.'/'.$slide.'/'.'/index.php');

    file_put_contents($temporaryDirectory.'/'.$presentation.'/'.$slide.'/'.$slide.'.html', '<p id="presentation_name" style="display:none">'.$presentation.'</p>', FILE_APPEND);
    
    var_dump($index);
    unlinkRecursive($temporaryDirectory,true);
}



function recurse_copy($src,$dst) { 
    $dir = opendir($src); 
    @mkdir($dst); 
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) && ( $file != '..' )) { 
            if ( is_dir($src . '/' . $file) ) { 
                recurse_copy($src . '/' . $file,$dst . '/' . $file); 
            } 
            else { 
                copy($src . '/' . $file,$dst . '/' . $file); 
            } 
        } 
    } 
    closedir($dir); 
} 

function unlinkRecursive($dir, $deleteRootToo)
{
    if(!$dh = @opendir($dir))
    {
        return;
    }
    while (false !== ($obj = readdir($dh)))
    {
        if($obj == '.' || $obj == '..')
        {
            continue;
        }

        if (!@unlink($dir . '/' . $obj))
        {
            unlinkRecursive($dir.'/'.$obj, true);
        }
    }

    closedir($dh);

    if ($deleteRootToo)
    {
        @rmdir($dir);
    }

    return;
}

function zipSlide() {

}

?>
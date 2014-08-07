<?php

$root = $_SERVER["DOCUMENT_ROOT"];
$temporaryDirectory = $root . '/tempory';
$globalAssets = setUpGlobalFiles($root,$temporaryDirectory);


packageSlide('01_presentation_what_is_spotlight','00_slide_what_is_spotlight',$globalAssets,$temporaryDirectory,$root);

var_dump($globalAssets);
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
    recurse_copy($slideFolder, $temporaryDirectory.'/'.$presentation.'/'.$slide);

    //Copy global files into slide directory
    /*
    foreach ($globalAssets[0] as $folder) {
        recurse_copy($root.'/global/'.$folder , $temporaryDirectory.$presentation.'/'.$slide.'/'.$folder);
    }
    
    $index = file_get_contents($temporaryDirectory.$presentation.'/'.$slide.'/index.php');
    $index = preg_replace('/(<\?php\s*\s*.*(.*)\s*;*\s*\?>)/',$globalAssets[1][0], $index);
    
    file_put_contents($temporaryDirectory.$presentation.'/'.$slide.'/'.$slide.'.html', $index);

   unlink($temporaryDirectory.$presentation.'/'.$slide.'/'.'/index.php');
   file_put_contents($tempDir.'/'.$slide.'/'.$slide.'.html', '<p id="presentation_name" style="display:none">'.$presentation.'</p>', FILE_APPEND);
   */
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

?>
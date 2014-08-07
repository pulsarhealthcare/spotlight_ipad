<?php

/************************************
 *
 *  Veeva Apllication Packer
 *  Copyright 2014 Pulsar Health Care
 *
 ***********************************/

/*
Globals
*/

if(isset($_GET['type'])) {

$presentation = $_GET['presentation'];

/*
Step One: Parse html to reference local assets 
*/

$globalFolder = $_SERVER["DOCUMENT_ROOT"].'/global/';

$files = scandir($globalFolder.'/html/');

$parsedHtml = array();

for ($x=2;$x < count($files); $x ++) {

	$contents = file_get_contents($globalFolder.'/html/'.$files[$x]);

	$parsedContents = str_replace('/global/', '', $contents);
  $parsedFileName = str_replace('.php','.html',$files[$x]);

  $fileArray = array($parsedFileName,$parsedContents);

	array_push( $parsedHtml, $fileArray);
}

/*
Step Two: Create references for all global files
*/

$globalFolders = scandir($globalFolder);

$folderPaths = array();

for($x=2; $x < count($globalFolders); $x ++) {
	
	if($globalFolders[$x] != 'html'){
       
       $thisFolder = scandir($globalFolder.$globalFolders[$x]);
       array_push($folderPaths,$globalFolders[$x]);

	}
	
}

/*
Step Three: Create tempory copy of app for parsing
*/

$slidesFolder = $_SERVER["DOCUMENT_ROOT"].'/presentations/'.$presentation;

$tempDir = $_SERVER["DOCUMENT_ROOT"].'/tempory';

if(is_dir($_SERVER["DOCUMENT_ROOT"].'/tempory')) {
    unlinkRecursive($tempDir,true);
}

mkdir($_SERVER["DOCUMENT_ROOT"].'/tempory');

$slides = scandir($slidesFolder);
$x=0;

foreach ($slides as $slide) {
	if($slide != '.' && $slide != '..')  {
      $x++;
	  recurse_copy($slidesFolder.'/'.$slide, $tempDir.'/'.$slide);
    }
}

//Copy global files into each slide 

foreach ($slides as $slide) {
	foreach ($folderPaths as $folder) {
		if($slide != '.' && $slide != '..')  {
        recurse_copy($_SERVER["DOCUMENT_ROOT"].'/global/'.$folder,$tempDir.'/'.$slide.'/'.$folder);
    }
  }
}


/* 
Step Four: Parse tempory files and rename
*/

$patterns = array();
$patterns[0] = "'/global/html/header.html'";
$patterns[1] = "'/global/html/menu.html'";
$patterns[2] = "'/global/html/footer.html'";
$replacements = array();
$replacements[0] = $parsedHtml[1][1];
$replacements[1] = $parsedHtml[2][1];
$replacements[2] = $parsedHtml[0][1];
ksort($patterns);
ksort($replacements);
$itts = 0;

foreach ($slides as $slide) {
	if($slide != '.' && $slide != '..')  {
		
	  $index = file_get_contents($tempDir.'/'.$slide.'/index.php');
   
    $index = str_replace($patterns, $replacements,$index);
	  $index = str_replace("<?php require","",$index);
    $index = str_replace(";?>","",$index);
    $index = str_replace("<?php","",$index);
    $index = str_replace('$root = $_SERVER["DOCUMENT_ROOT"]',"",$index);
    $index = str_replace('$root.',"",$index);
    $index = str_replace("","",$index);

    file_put_contents($tempDir.'/'.$slide.'/'.$slide.'.html', $index);
    file_put_contents($tempDir.'/'.$slide.'/'.$slide.'.html', '<p id="presentation_name" style="display:none">'.$presentation.'</p>', FILE_APPEND);
    unlink($tempDir.'/'.$slide.'/index.php');
	}
} 

/*
Step Six: ZIP folders
*/

$app_folder = 'packaged/'.$presentation.'_'.date('Hisdmy');

mkdir($app_folder);

foreach ($slides as $slide) {
	if($slide != '.' && $slide != '..')  {

		   $zip = new ZipArchive();

           $filename = $app_folder.'/'.$slide.'.zip';
           
           if ($zip->open($filename, ZipArchive::CREATE)!==TRUE) {
               exit("cannot open <$filename>\n");
           }
           
           
           $dirList = scandir($tempDir.'/'.$slide);
           
           foreach ($dirList as $path) {
           	   if($path != '.' && $path != '..')  {
           	      if(is_dir($tempDir.'/'.$slide.'/'.$path)) {

                     $subDirList = scandir($tempDir.'/'.$slide.'/'.$path);
                    
                     foreach ($subDirList as $file) {
                     	if($file != '.' && $file != '..')  {
                     	   if(!is_dir($tempDir.'/'.$slide.'/'.$path.'/'.$file)) {
                          
                           $zip->addFile($tempDir.'/'.$slide.'/'.$path.'/'.$file, $path.'/'.$file);
                     	  
                     	   } else {
                     	   	  $subDirList1 = scandir($tempDir.'/'.$slide.'/'.$path.'/'.$file);
                                
                     	   	    foreach ($subDirList1 as $sFile) {
                     	   	    	if($sFile != '.' && $sFile != '..')  {
                     	   	    		$zip->addFile($tempDir.'/'.$slide.'/'.$path.'/'.$file.'/'.$sFile, $path.'/'.$file.'/'.$sFile);
                     	   	    	}
                     	   	    }
                     	   }
                     	}
                     }

           	      } else {
                     $zip->addFile($tempDir.'/'.$slide.'/'.$path,$path);
           	      }
               } 
           }

           $zip->close();
      }
    
}


/*
Delete tempory folder
*/

unlinkRecursive($tempDir,true);

echo '<h1>Packaging Successfull</h1>';
echo '<a href="/'.$app_folder.'">'.$app_folder.'</a>';

} else {
  echo '<h1>No presentation selected</h1>';
}
/*
Helper functions
*/

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
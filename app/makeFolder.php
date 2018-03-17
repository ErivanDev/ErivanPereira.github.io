<?php 
    mkdir("testing"); 
    $myfile = fopen("testing/newfile.html", "w") or die("Unable to open file!");
    $html = "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
    <title>Perfil</title>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </head>
    <body>
    </body>
    </html>
";
    fwrite($myfile, $html);
    fclose($myfile);
?>
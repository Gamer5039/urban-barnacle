$audioUrl = "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav"
$outputPath = "..\public\audio\en\day-1.mp3"

Invoke-WebRequest -Uri $audioUrl -OutFile $outputPath

# Copy the same file for Hindi version
Copy-Item $outputPath "..\public\audio\hi\day-1.mp3"

Write-Host "Audio files downloaded and copied successfully!"

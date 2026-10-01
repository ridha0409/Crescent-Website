# ---------------------------------------------------------------------------
# Downloads the CDOE staff and leadership photos from the live Crescent site
# into src/assets/, with clean file names that match the code.
#
# Run it from PowerShell:
#     cd D:\crescent-website\cresoline
#     powershell -ExecutionPolicy Bypass -File .\download-photos.ps1
#
# Safe to re-run — it just overwrites what it downloaded before.
# ---------------------------------------------------------------------------

$ErrorActionPreference = 'Continue'
$base   = 'https://online.crescent-institute.edu.in/img'
$assets = Join-Path $PSScriptRoot 'src\assets'

# folder -> @{ remote file name = local file name }
$groups = @{
  'visionary' = [ordered]@{
    'visionary/founder.jpg'                = 'founder.jpg'
    'visionary/chancellor.jpg'             = 'president.jpg'
    'visionary/Chancellor%20(1).jpg'       = 'chancellor.jpg'
    'visionary/prochancellor.png'          = 'pro-chancellor.png'
    'visionary/VC-1.jpg'                   = 'vice-chancellor.jpg'
    'visionary/additional-registrar.jpg'   = 'registrar.jpg'
  }
  'technical' = [ordered]@{
    'technical/merline.jpg'   = 'p-paul-merline.jpg'
    'technical/mohammed.jpg'  = 'a-mohamed-meerasa-mujahith.jpg'
    'technical/rooban.jpg'    = 'k-rooban.jpg'
    'technical/latha.jpg'     = 'r-latha.jpg'
    'technical/vignesh.jpg'   = 'd-vignesh.jpg'
    'technical/deepak.jpg'    = 'r-deepak.jpg'
  }
  'execution' = [ordered]@{
    'mca/people/jaya.jpg'                  = 'director-jaya.jpg'
    'execution/DR.AISHABANU.jpg'           = 'aisha-banu.jpg'
    'execution/DR.LATHATAMILSELVAN.jpg'    = 'latha-tamilselvan.jpg'
    'execution/Dr.C.Tharini.jpg'           = 'c-tharini.jpg'
    'execution/DR.SHARMILASANKAR.jpg'      = 'sharmila-sankar.jpg'
    'execution/director.jpg'               = 'rhymend-uthariaraj.jpg'
  }
  'nonteaching' = [ordered]@{
    'nonteaching/usha4%20copy.jpg' = 'a-usha-rani.jpg'
    'nonteaching/ujjal.jpeg'       = 'ujjal-sikdar.jpg'
    'nonteaching/kumaresan.jpg'    = 'n-kumaresan.jpg'
    'nonteaching/vijay.jpg'        = 'n-vijayakumar.jpg'
  }
}

$ok = 0
$failed = @()

foreach ($folder in $groups.Keys) {
  $dir = Join-Path $assets $folder
  New-Item -ItemType Directory -Force -Path $dir | Out-Null

  foreach ($remote in $groups[$folder].Keys) {
    $localName = $groups[$folder][$remote]
    $url  = "$base/$remote"
    $dest = Join-Path $dir $localName
    try {
      Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 30
      $kb = [math]::Round((Get-Item $dest).Length / 1KB)
      Write-Host ("  OK    {0,-40} {1} KB" -f "$folder/$localName", $kb) -ForegroundColor Green
      $ok++
    } catch {
      Write-Host ("  FAIL  {0,-40} {1}" -f "$folder/$localName", $_.Exception.Message) -ForegroundColor Red
      $failed += "$folder/$localName"
      if (Test-Path $dest) { Remove-Item $dest -Force }
    }
  }
}

Write-Host ""
Write-Host "Downloaded $ok of 22 photos into src\assets\" -ForegroundColor Cyan
if ($failed.Count -gt 0) {
  Write-Host "Could not fetch:" -ForegroundColor Yellow
  $failed | ForEach-Object { Write-Host "  - $_" }
}

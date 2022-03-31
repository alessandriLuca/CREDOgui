docker build . -t  repbioinfo/dockerfilegeneratorv17
@Set "Build=%CD%"
@Echo(%Build%
@If Not Exist "configurationFile.txt" Set /P "=%Build%" 0<NUL 1>"configurationFile.txt"
mkdir %Build%
copy configurationFile.txt %Build%
del %Build%\id.txt
docker run -itv %Build%:/sharedFolder/ -v /var/run/docker.sock:/var/run/docker.sock --privileged=true --cidfile  %Build%\id.txt -p 3000:3000   -e DISABLE_AUTH=true repbioinfo/dockerfilegeneratorv17

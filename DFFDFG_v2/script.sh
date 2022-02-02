docker build . -t  repbioinfo/dockerfilegeneratorv6
tt=$(head configurationFile.txt)
mkdir $tt
cp ./configurationFile.txt $tt
rm $tt\id.txt
docker run -itv $tt:/sharedFolder -v /var/run/docker.sock:/var/run/docker.sock --cidfile  $tt\id.txt --privileged=true -p  3000:3000 repbioinfo/dockerfilegeneratorv6

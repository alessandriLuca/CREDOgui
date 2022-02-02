var spawn = require('child_process');
var out="";
function runexec(command,parameters,ecwd)
{
   let child = spawn.spawnSync(command, parameters,{cwd:ecwd});
    if(child["error"]!=null)
    {
        out+=child["error"];
        console.log(child["error"]);
    }
    else
    {
    stdout=child["stdout"].toString();
    stderr=child["stderr"].toString();
    }
    if (stdout!="")
    {
        console.log(stdout);
        out+=(stdout);
    }
    if (stderr!="")
    {
        console.log(stderr);
        out+=(stderr);
    }
    if (child["status"]!=null)
        {out+="Process exit with code "+child["status"].toString();
        console.log("Process exit with code "+child["status"].toString());
        }
    else {
        out+="No exit coded was given";
    }

}

function spawnutility(command,parameters)
{
    let child = spawn.spawnSync(command, parameters);
    stdout=child["stdout"].toString();
    stderr=child["stderr"].toString();
    if (stdout!="")
    {
       console.log(stdout);
       out+=(stdout);
    }
    if (stderr!="")
    {
        console.log(stderr);
        out+=(stderr);
    }
    out+="Process exit with code "+child["status"].toString();
    console.log("Process exit with code "+child["status"].toString());
}

function mergedelete(path,foldername)
{   
    localfiles = fs.readdirSync(path);
    localfiles.forEach(file=>{
        state=fs.statSync(path+"/"+file);
        if(file!=foldername && state.isDirectory()){remove(path+"/"+file);}
    });
}

function moveto(initial,end)
{
    sendmessage("Start move from"+initial+"to"+end);
    spawnutility("mv",[initial,end]);
}

function copyto(initial,end)
{
    sendmessage("Start move from"+initial+"to"+end);
    spawnutility("cp",["-R",initial,end]);
}

function createfolder(path)
{
    spawnutility("mkdir",[ "-p",path]);
}

function remove(path)
{
    spawnutility("rm",["-rf",path]);
}


function folderstructure(path,deep)
{
    let localpath=dir+path
    const localfiles = fs.readdirSync(localpath);
    if((localfiles.find((file)=>file === "runMe.sh"))==="runMe.sh") // Find a more efficient method
    {
        mom=supportstructure.pop();
        supportstructure.push(mom);
        structure=structure+mom+"#";
    }
    else
    {
     localfiles.forEach
        (
            file => 
            {
                let completepath=localpath+"/"+file;
                let partialpath=path+"/"+file;
                let state=fs.statSync(completepath);
                if (state.isDirectory()) 
                {
                  if ((deep==0 && file.match(regex) )|| (deep!=0 && file[0]!="."))  
                  {
                      supportstructure.push(partialpath);
                      folderstructure(partialpath,(deep+1));
                  }
                }
            }
        );   
    }
}

function loadexceptions()
{
    let file = fs.readFileSync('/nodejs/exceptions.txt');
    let reading = file.toString();
    reading=reading.split("/").join('sep'); 
    reading=reading.split(".").join("");
    reading= reading.replace(/[\n\r]/g, '');
    let exception;
    let exceptionstring="<script> var exceptionstruct ={}; ";
    let exceptions= reading.split("#");
    exceptions.forEach(element =>
                       {
                            exception=element.split("=");
                            exceptionstring=exceptionstring+ ' exceptionstruct["'+exception[0]+'"]="'+exception[1]+'"; ';

                        }
                      
                      );
    exceptionstring=exceptionstring+'</script>';
    return exceptionstring
}

function sendmessage(output)
{
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    entry="<span class='entry'><span class='time'>"+hours+":"+minutes+":"+seconds+"</span>: "+output+"</span>";
}

const fs = require('fs');

var qs = require('querystring');
const concat = require('concat-stream');
const regex=/^[0-9]{1,3}_.*/;
var html;
var supportstructure=[];
var structure="";
var dir = '/home/dockerFileGenerator/';
var exceptions=loadexceptions();
var header = fs.readFileSync('/nodejs/support/header.html').toString();
var head= fs.readFileSync('/nodejs/support/head.html').toString();
var footer = fs.readFileSync('/nodejs/support/footer.html').toString();
var script = fs.readFileSync('/nodejs/support/script.js').toString();
var dockerscript= fs.readFileSync('/nodejs/support/dockerinstall.js').toString();
var initialize= fs.readFileSync('/nodejs/support/initialize.js').toString();
var temporarypath="/sharedFolder/temp";
var configpath="/sharedFolder/configurationFile.txt";
folderstructure("",0);
var consolelog=[];
html=head+"<script> var structure='"+structure+"'</script>"+exceptions+script+initialize+dockerscript+header+footer;
var options = '';


var http = require('http');
var server=http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    console.log(req.url);
    if (req.url == '/') 
    {            
        res.write(html);
        res.end();  
    }
    else if (req.url.split("+")[0]=="/deletemerge")
    {
        values=req.url.split("+");
        path=values[1];
        foldername=values[2];
        mergedelete(path,foldername);
        res.write(out);
        res.end();
        out="";
    }
    else if (req.url.split("+")[0]=="/deleteone")
    {
        values=req.url.split("+");
        foldername=values[1];
        remove(foldername);
        res.end(out);
        out="";
    }
    else if (req.url.split("+")[0]=="/createfolder")
    {
        values=req.url.split("+");
        path=values[1];
        createfolder(path);
        res.write(out);
        res.end();
        out="";
    }
    else if (req.url.split("+")[0]=="/runexec")
    {
        values=req.url.split("+");
        command=values[1];
        parameters=values[2].split("SEP");
        cwd=values[3];
        runexec(command,parameters,cwd)
        res.write(out);
        res.end();
        out="";
    }
      else if (req.url.split("+")[0]=="/moveto")
    {
        values=req.url.split("+");
        initial=values[1];
        end=values[2];
        moveto(initial,end);
        res.write(out);
        res.end();
        out="";
    }
      else if (req.url.split("+")[0]=="/copyto")
    {
        values=req.url.split("+");
        initial=values[1];
        end=values[2];
        copyto(initial,end);
        res.write(out);
        res.end();
        out="";
    }
    else if(req.url== "/update")
    {
        runexec("git",["pull"],"/home/dockerFileGenerator/");        
        folderstructure("",0);
        console.log(out);
        if (out.startsWith("Updating"))
      {
            let id= fs.readFileSync('/sharedFolder/id.txt').toString();
            folderstructure("",0);
            spawnutility("docker",["commit",id,"repbioinfo/dockerfilegeneratorv4"])
            res.write(out);

            res.end();
        }           
        else
           res.end("no");
        out="";
    }
    else if(req.url.split("+")[0]=="/config")
    {
        var mompath=dir+req.url.split("+")[1]+"/";
        var mommompath=fs.readdirSync(mompath).filter(fn => fn.startsWith('config')).toString();
        completepath=mompath+mommompath;
        var configurationstring = fs.readFileSync(completepath).toString();
        res.write("<span id='textcontainer'><textarea id='textcontent'>"+configurationstring+"</textarea><button id='send' value='"+completepath+"'>Save</button><button id='close'>Close</button></span>");
        res.end();
    }
    else if(req.url=="/configsend")
    {
        value='';
        if (req.method == 'POST') 
        { 
            req.on('data', function (data) 
            {
                value += data;
            });

        req.on('end', function () 
        {
            var post = qs.parse(value)
            console.log(post);
            let split=post[Object.keys(post)[0]].split("XXX");
            fs.writeFileSync(split[0], split[1], 'utf-8');
            consolelog.push("Config correctly saved");           
        });
            res.end();
        }   
    }
    req.method="";
});

server.listen(3000);


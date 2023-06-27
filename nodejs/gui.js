const { spawn } = require('child_process')
var finish = false;
var working= true;
var out="";
var booleanlog=false;//
var logpath;

function writeonlogtxt(text)
{
    if(booleanlog==false)
    {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        logpath=(year + "-" + month + "-" + date + " " + hours + " " + minutes+".txt");
        booleanlog=true;
    
    }
    fs.writeFile("/sharedFolder/log-"+logpath, text,{flag:"a"}, function(err) {
    if(err) {
      return console.error(err);
    }
});

}

function chmod()
{
    let spawn = require('child_process');
   let child = spawn.spawnSync("chmod",["-R","777","/sharedFolder"] );
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
function runexec(command,parameters,ecwd)
{    
   let child = spawn(command, parameters,{cwd:ecwd});
    runregex=/\[[0-9]{1}.*\/.*[0-9]\]/;
    ubunturegex=/Step/;
    child.stdout.on('data', (data) => {
        
        data=data.toString();
        writeonlogtxt(data);
        filter=data.split("\n");
        filter.forEach(elem=>{
            //console.log(elem);
           if (elem.includes("Docker container failed"))
           {
               working=false;
               booleanlog=false;
           }
            if(elem.match(runregex) || elem.match(ubunturegex))
               {
                   out+="<br>"+elem;

               }
            }
        );
        });

child.stderr.on('data', (data) => {
            data=data.toString();

     writeonlogtxt(data);
            filter=data.split("\n");
        filter.forEach(elem=>{
            //console.log(elem);
              if (elem.includes("Docker container failed"))
              {
                  working=false;
                 booleanlog=false;
              }

            if(elem.match(runregex) || elem.match(ubunturegex))
               {out+="<br>"+elem;
                  
               }
            }
        );
});

child.on('close', (code) => {
        chmod();
            finish=true;

console.log('child process exited with code '+code);
});

}

function gitpull(command,parameters,ecwd)
{
    let spawn = require('child_process');
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
     let spawn = require('child_process');

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
/* FOR NOW THIS FUNCTIONS ARE NOT USED

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

*/

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
        process.exit();
});

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
                if (file=="inputconfig.txt")
                     inputstructure+="inputstructure['"+path.substring(1)+"']='"+fs.readFileSync(completepath).toString().split("\n").join("||")+"';";
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

function existfolders()
{
     let folders="";
     let localpath="/sharedFolder"
    const localfiles = fs.readdirSync(localpath);

     localfiles.forEach
        (
            file => 
            {
                let completepath=localpath+"/"+file;
                let state=fs.statSync(completepath);
                if (state.isDirectory()) 
                {
                    folders+=file+"|";
                }
            }
        );   
    return folders;
}

function asyncrunexec(url,res)
{
        values=url.split("+");
        command=values[1];
        parameters=values[2].split("SEP");
        cwd=values[3];
        runexec(command,parameters,cwd) ;        
}

const fs = require('fs');

var qs = require('querystring');
const concat = require('concat-stream');
const regex=/^[0-9]{1,3}_.*/;
var html;
var supportstructure=[];
var structure="";
var inputstructure="var inputstructure=[];";
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
fnames=existfolders();
html=head+"<script> var structure='"+structure+"';"+inputstructure+" var fnames='"+fnames+"'</script>"+exceptions+script+initialize+dockerscript+header+footer;
var options = '';
var http = require('http');
var server=http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    if (req.url == '/') 
    {            
        res.write(html);
        res.end();  
    }
    else if (req.url=="/percentage")
    {
        if (finish==false || finish==true && out!="")
        {
            res.end(out);
            out="";
        }
        else
        {
            if (working==true)
                res.end("well");
            else
                res.end("bad");
            
            finish=false;
        }
    }
   else if (req.url.split("+")[0]=="/runexec")
    {
        setTimeout(asyncrunexec.bind(null, req.url,res), 0);
        res.end("END");
    }
    else if(req.url== "/update")
    {
        gitpull("git",["pull"],"/home/dockerFileGenerator/");        
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
    else if(req.url=="/rmdocker")
    {
            let spawn = require('child_process');
           let child = spawn.spawnSync('/home/ripuliscimi.sh',{cwd:'/home/'});
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
        res.write(out);
        res.end()
        out="";
    
    }
    /* FOR NOW THIS FUNCTIONS ARE NOT USED
    else if (req.url.split("+")[0]=="/deleteone")
    {
        values=req.url.split("+");
        foldername=values[1];
        remove(foldername);
        res.end(out);
        out="";
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
    else if (req.url.split("+")[0]=="/createfolder")
    {
        values=req.url.split("+");
        path=values[1];
        createfolder(path);
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
    */

    req.method="";
});

server.listen(3000);


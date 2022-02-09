<script>
    var interval
$(document).ready(function()
{
    var queue=[];
    var working="well";
  
    function runexec(command,parameters,ecwd)
    {
       sendmessage("<span class='command'>Running "+command+" with parameters "+parameters+"</span>");
        $.ajax({
         async: true,
         type: 'GET',
         timeout: 0,
         url: '/runexec+'+command+"+"+parameters.join("SEP")+"+"+ecwd,
         success: function(data) {
              //sendmessage("Running ended with output: \n"+data);
         },
            error:function(xhr){
console.log("An error occured: " + xhr.status + " " + xhr.statusText);}
    });
    }
    
        function percentage()
    {
        $.ajax({
         async: true,
         type: 'GET',
         url: '/percentage',
         success: function(data) {
             if (data=="well" || data=="bad")
             {
                 working=data;
                 startroutine();
             }
             else
             {
                 if (data!="")
                    sendmessage(data);
             }
         },
            error:function(xhr){
console.log("An error occured: " + xhr.status + " " + xhr.statusText);}
    });
    }
    
/*  FOR NOW THIS FUNCTIONS ARE NOT USED
    function moveto(initial,end)
    {
        sendmessage("Start move from "+initial+" to "+end);
            $.ajax({
         async: true,
         type: 'GET',
         url: '/moveto+'+initial+'+'+end,
         success: function(data) {
              sendmessage("Move ended with output:\n "+data);
             startroutine();
         }
    });
    }

    function copyto(initial,end)
    {
        sendmessage("Start copy from "+initial+" to "+end);
            $.ajax({
         async: true,
         type: 'GET',
         url: '/copyto+'+initial+"+"+end,
         success: function(data) {
              sendmessage("Copy ended with output: \n"+data);
             startroutine();
             
         }
    });
    }

    function deletemergefile(path,foldername)
    {
           sendmessage("Deleting useless files");
            $.ajax({
         async: true,
         type: 'GET',
         url: '/deletemerge+'+path+"+"+foldername,
         success: function(data) {
              sendmessage("Deleted succesfully");
             startroutine();
         }
    });

    }
    
    
function deleteonefolder(foldername)
    {
        sendmessage("Deleting trash folders");
            $.ajax({
         async: true,
         type: 'GET',
         url: '/deleteone+'+foldername,
         success: function(data) {
              sendmessage("Deleted succesfully");
             startroutine();
         }
    });
    
    }


    function createfolder(path)
    {
            $.ajax({
         async: false,
         type: 'GET',
         url: '/createfolder+'+path,
         success: function(data) {
             sendmessage("Output folder created");
                     startroutine();
             
         }
    });
    }

    
*/
   

window.sendmessage=function(output)
    {
        let date_ob = new Date();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        entry="<span class='entry'><span class='time'>"+hours+":"+minutes+":"+seconds+"</span>: "+output+"</span>";
        
         $("#entrycontainer").append(entry);

    var objDiv = document.getElementById("console");
objDiv.scrollTop = objDiv.scrollHeight;

    }
    
//this function will create the instllation routine necessary to send asyncronous message
    function createroutine(data)
    {   
        var dir = '/home/dockerFileGenerator/';
        var sharedpath="/sharedFolder/";
        var configpath="/sharedFolder/configurationFile.txt";
        functions=data;    
        pathformerge=[];
        for (const category in functions) 
        {
            if (category==0)
                {
                    languages=functions[category].split("QWE");
                    languages.pop();
                    languages.forEach(element => 
                    {
                        parameters=element.split("|");
                        path=parameters[0];
                        foldername=parameters[1];                            
                        pathformerge.push(sharedpath+foldername);
                        dockername=parameters[2];
   queue.push("runexec|"+dir+path+"/runMe.sh"+"|"+dockername+"£"+foldername+"£"+sharedpath+"£"+configpath+"|"+dir+"/"+path+"/");
                    });
                } 
                else if (category ==1)
                {
                    parameters=functions[category].split("|");
                    path=parameters[0];
                    foldername=parameters[1];
                    queue.push("runexec|"+dir+path+"/runMe.sh"+"|"+foldername+"£"+pathformerge[0]+"£"+pathformerge[1]+"£"+sharedpath+"|"+dir+"/"+path+"/");
                }
                else if (category ==2)
                {
                    parameters=functions[category].split("|");
                    path=parameters[0];
                    dockername=parameters[1];
                    tmpdockername=parameters[2];
                    mergefoldername=functions[1].split("|")[1];                                                 queue.push("runexec|"+dir+path+"/runMe.sh"+"|"+sharedpath+"/"+mergefoldername+"£"+tmpdockername+"£"+dockername+"£"+sharedpath+"£"+configpath+"|"+dir+"/"+path+"/");
                    splitpath = path.split("/");
                    cat=splitpath[splitpath.length-1];
            }
             else if (category ==3)
                {
                    path=functions[category].split("|")[0];
                    splitpath = path.split("/");
                    queue.push("runexec|"+dir+path+"/runMe.sh"+"|"+sharedpath+"/"+mergefoldername+"_"+cat+"£"+sharedpath+"|"+dir+"/"+path+"/");
                }
        }
        if (queue.length!=0)
        {            
            $('#dckstart').prop('disabled', true);
            sendmessage("Docker creation is starting");
           startroutine();
            interval=setInterval(percentage, 5000);

        }
        else
            sendmessage("No installing options was selected");
    }
    
    
function startroutine()
{
    if(queue.length!=0 && working=="well")
    {
        let toexec= queue.shift();
        actions=toexec.split("|");
        
        if(actions[0]=="runexec")
        {
            let obj=actions[2].split("£");
            runexec(actions[1],obj,actions[3]);
        } 
        /* FOR NOW THIS ACTION ARENOT USED 
        else if(actions[0]=="move")
        {
            moveto(actions[1],actions[2]);
        }
        else if(actions[0]=="copy")
        {
            copyto(actions[1],actions[2]);
        }
        else if(actions[0]=="delete")
        {
            deletemergefile(actions[1],actions[2]);
        }
        else if(actions[0]=="folder")
        {
             createfolder(actions[1]);
        }else if(actions[0]=="delone")
        {
            deleteonefolder(actions[1]);
        }
        */
    }
    else
    {
        var audio = new Audio('https://www.mboxdrive.com/Auditorium%20Applause-SoundBible.com-280911206.mp3');
                    clearInterval(interval);

        console.log(working);
        if (working=="well")
        {
            sendmessage("<span class='finish'>Docker creation is finished!</span>");
                    audio.play();


        }
            else
        {
            sendmessage("<span class='finish error'>Installation failure, check log.txt for more information.</span>");
        }
    }
}
    

    $('#dckstart').click(function(){
         let data={};
         data[0]="";
        console.log(fnames)
        let existantfolder= fnames.split("|");
        console.log(existantfolder)
       let empty=true;
        let existant=false;
        let name="";


       $(':checkbox').each(function()
        {
           //Considering that the first level might be have more than one element, i declare it before to insert...
            if (this.checked==true)
            {
                id=this.id; 
                field=id[0];
    // CONSIDERING THAT FOR JQUERY PROBLEM I HAD TO DELETE THE DOT, I RECONSTRUCT THE PATH USING BOTH ID AND VALUE OF AN INPUT   
                path=this.id.split("sep");
                path.pop();
                path.pop();
                path.push(this.value);
                stringpath=path.join("/");
                if (field==0)
                {
                    query=id.split("sep")[0]+"sep";
                    foldername= $("#folder"+query).val();
                    dockername=$("#docker"+query).val();
                    if(existantfolder.includes(foldername))
                    {
                        existant=true;
                        name=foldername;
                    }
                    if(foldername=="" || dockername=="")
                        empty=false;
                    data[0]=data[0]+stringpath+"|"+foldername+"|"+dockername+"QWE";
                } 
                else if (field ==1)
                {
                    query=id.split("sep")[0]+"sep";
                    foldername= $("#folder"+query).val();
                     if(existantfolder.includes(foldername))
                    {
                        existant=true;
                        name=foldername;
                    }
                    if(foldername=="")
                        empty=false;
                    data[1]=stringpath+"|"+foldername;
                }
                else if (field ==2)
                {
                    query=id.split("sep")[0]+"sep";
                    dockername=$("#docker"+query).val();
                    tmpdockername=$("#tmpdocker"+query).val();
                    if(dockername=="" || tmpdockername=="")
                        empty=false;
                    data[2]=stringpath+"|"+dockername+"|"+tmpdockername;
                }
                else if (field ==3)
                {
                    data[3]=stringpath;
                }
            }
        }) ;
        
    const scrollHeight = document.body.scrollHeight;
    window.scrollTo(0, scrollHeight);
    
    if(empty==false)
    {
        sendmessage("<span class='error'>Docker installation is NOT started. You need to fill all the fields of the selected sections.</span>");
        empty=true;
    }
     else if(existant==true)
           {
        sendmessage("<span class='error'>Docker installation is NOT started. Foldername '"+name+"' already exist.</span>");
        existant=false;
    }  
        else
        createroutine(data);

     });   
});

</script>
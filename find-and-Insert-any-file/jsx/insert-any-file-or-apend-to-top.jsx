#target premierepro




var VASequenece = app.project.activeSequence;

var project = app.project;

var videoTracks = app.project.activeSequence.videoTracks;

var rootProject = project.rootItem;

function ErrorAlert() {
    alert("There are no Errors!!!");
}

function main(fileNameFromUser) {

    var VASequenece = app.project.activeSequence;

    var project = app.project;

    var videoTracks = app.project.activeSequence.videoTracks;

    var rootProject = project.rootItem;

    var theFileName = fileNameFromUser.toString();

    var theFileNameArray = theFileName.split('/')




    if (theFileNameArray.length > 1) {

        
        if ((theFileNameArray[1].toString() <= -1 || theFileNameArray[1] > videoTracks.length) || isNaN(theFileNameArray[1])  || (theFileNameArray[1].toString() === "") || (/\s/g.test(theFileNameArray[1].toString()))) {
            alert(theFileNameArray[1].toString() + "  Track doesn't exist!!!")
            return;
        }
        if(theFileNameArray[2]!=null){
            if(isNaN(theFileNameArray[2]))
            {
                alert(theFileNameArray[1].toString() + "  Track doesn't exist!!!")
                return;
            }
        }

        if(theFileNameArray.length ==2){
            insertToATrack(theFileNameArray[0], theFileNameArray[1]);
        }
        else if(theFileNameArray.length ==3){
            insertToAVideoAndAudioTracks(theFileNameArray[0], theFileNameArray[1] , theFileNameArray[2]);
        }
        else{
            alert("Don't add alot of backslashes");
            return;
        }
        

    } else {
        insertAnyFileOrToTop(theFileName);

    }

}


function insertToATrack(TheFileName, TrackNumber) {

    var project = app.project;

    var videoTracks = app.project.activeSequence.videoTracks;
    var audioTracks = app.project.activeSequence.audioTracks;


    var rootProject = project.rootItem;

    //var nameOfBin ='Intro + outro + in mid music';
    var nameOfFirstFileToInsert = TheFileName;


    var FirstFileToInsert = SearchForAnyProjectItem(nameOfFirstFileToInsert);


    if (FirstFileToInsert == null) {
        alert("The File Doesn't exist!")
        return;
    }

    //alert(FirstFileToInsert.getAudioChannelMapping.audioClipsNumber.toString());

    var thisCLipLength = FirstFileToInsert.getOutPoint(1);

    //alert( thisCLipLength.ticks.toString());

    var playHeadTime = new Time();

    playHeadTime = qe.project.getActiveSequence().CTI.ticks;

    //alert(playHeadTime.toString());



    app.project.activeSequence.videoTracks[TrackNumber - 1].overwriteClip(FirstFileToInsert, playHeadTime);




}



function insertToAVideoAndAudioTracks(TheFileName, TrackVideo, TrackAudio) {

    var project = app.project;

    var videoTracks = app.project.activeSequence.videoTracks;
    var audioTracks = app.project.activeSequence.audioTracks;


    var rootProject = project.rootItem;

    //var nameOfBin ='Intro + outro + in mid music';
    var nameOfFirstFileToInsert = TheFileName;


    var FirstFileToInsert = SearchForAnyProjectItem(nameOfFirstFileToInsert);


    if (FirstFileToInsert == null) {
        alert("The File Doesn't exist!")
        return;
    }

    //alert(FirstFileToInsert.getAudioChannelMapping.audioClipsNumber.toString());

    var thisCLipLength = FirstFileToInsert.getOutPoint(1);

    //alert( thisCLipLength.ticks.toString());

    var playHeadTime = new Time();

    playHeadTime = qe.project.getActiveSequence().CTI.ticks;

    //alert(playHeadTime.toString());


    
    //app.project.activeSequence.videoTracks[TrackVideo-1].overwriteClip(FirstFileToInsert, playHeadTime);
    app.project.activeSequence.insertClip(FirstFileToInsert, playHeadTime, (TrackVideo-1), (TrackAudio-1));




}




function insertAnyFileOrToTop(TheFileName) {

    var seq = app.project.activeSequence;




    var project = app.project;

    var videoTracks = app.project.activeSequence.videoTracks;
    var audioTracks = app.project.activeSequence.audioTracks;


    var rootProject = project.rootItem;

    var nameOfFirstFileToInsert = TheFileName;


    var FirstFileToInsert = SearchForAnyProjectItem(nameOfFirstFileToInsert);


    if (FirstFileToInsert == null) {
        return;
    }



    var thisCLipLength = FirstFileToInsert.getOutPoint(1);

    //alert( thisCLipLength.ticks.toString());

    var playHeadTime = new Time();

    playHeadTime = qe.project.getActiveSequence().CTI.ticks;


    var outTime = new Time();

    outTime = (app.project.activeSequence.videoTracks[0].clips[0].end.ticks);

    var theAudioFileTrack = 3;
    var theVideoFileTrack = 1;



    var isAudioTrackFinished = false;

    var isVideoTrackFinished = false;

    //alert("we are at before loop");
    //alert(videoTracks.length.toString());


    var theAudioFileClipNo = 0;
    var theVideoFileClipNo = 0;


    if (FirstFileToInsert.getAudioChannelMapping.audioClipsNumber.toString() != 0) {
        for (var i = 0; i < app.project.activeSequence.audioTracks.length; i++) {
            // alert("we are at videoTrack " + i);
            if (app.project.activeSequence.audioTracks[i].clips.length == 0) {
                //alert("we are at videoTrack " + i + " at clip " + 0 + "and we will add the clip")
                //app.project.activeSequence.audioTracks[i].overwriteClip(FirstFileToInsert, playHeadTime);
                theAudioFileTrack = i;
                theAudioFileClipNo = 0;

                isAudioTrackFinished = true;
                if (isAudioTrackFinished == true) {
                    break;
                }
            } else {


                for (var j = 0; j < app.project.activeSequence.audioTracks[i].clips.length; j++) {
                    //alert("we are at videoTrack " + i + " at clip " + j)
                    if (app.project.activeSequence.audioTracks[i].clips[j].start.ticks < playHeadTime &&
                        app.project.activeSequence.audioTracks[i].clips[j].end.ticks < playHeadTime) {
                        // alert("it looks like the clip reached is not in range of the playheadTime");
                        continue;
                    } else if (app.project.activeSequence.audioTracks[i].clips[j].start.ticks < playHeadTime &&
                        app.project.activeSequence.audioTracks[i].clips[j].end.ticks > playHeadTime) {
                        // alert("it looks like the clip reached is in the middleof the playheadTime");
                        break;

                    } else if ((thisCLipLength.ticks + playHeadTime) >
                        app.project.activeSequence.audioTracks[i].clips[j].start.ticks ||
                        app.project.activeSequence.audioTracks[i].clips[j + 1] == null) {
                        //alert("the file at" + (j) + "is causing proplems");
                        break;
                    } else if ((thisCLipLength.ticks + playHeadTime) >
                        app.project.activeSequence.audioTracks[i].clips[j].start.ticks ||
                        (thisCLipLength.ticks + playHeadTime) >
                        app.project.activeSequence.audioTracks[i].clips[j + 1].start.ticks) {
                        //alert("the file at "+ j +" and at "+ (j+1) + " are causing proplems");
                        break;
                    } else {

                        //alert("Everything is clear !!we will add the clip")
                        theAudioFileTrack = i;
                        theAudioFileClipNo = j + 1;
                        isAudioTrackFinished = true;
                        //app.project.activeSequence.audioTracks[i].overwriteClip(FirstFileToInsert, playHeadTime);
                        if (isAudioTrackFinished == true) {
                            break;
                        }


                    }
                }
            }
            if (isAudioTrackFinished == true) {
                break;
            }

        }
    }



    for (var i = 0; i < app.project.activeSequence.videoTracks.length; i++) {
        //alert("we are at videoTrack " + i);
        if (app.project.activeSequence.videoTracks[i].clips.length == 0) {
            //alert("we are at videoTrack " + i + " at clip " + 0 + "and we will add the clip")
            //app.project.activeSequence.videoTracks[i].overwriteClip(FirstFileToInsert, playHeadTime);
            theVideoFileTrack = i;
            theVideoFileClipNo = 0;
            isVideoTrackFinished = true;
            if (isVideoTrackFinished == true) {
                break;
            } else {
                for (var j = 0; j < app.project.activeSequence.videoTracks[i].clips.length; j++) {
                    //alert("we are at videoTrack " + i + " at clip " + j)
                    if (app.project.activeSequence.videoTracks[i].clips[j].start.ticks < playHeadTime &&
                        app.project.activeSequence.videoTracks[i].clips[j].end.ticks < playHeadTime) {
                        //alert("it looks like the clip reached is not in range of the playheadTime");
                        continue;
                    } else if (app.project.activeSequence.videoTracks[i].clips[j].start.ticks < playHeadTime &&
                        app.project.activeSequence.videoTracks[i].clips[j].end.ticks > playHeadTime) {
                        //alert("it looks like the clip reached is in the middleof the playheadTime");
                        break;

                    } else if ((thisCLipLength.ticks + playHeadTime) >
                        app.project.activeSequence.videoTracks[i].clips[j].start.ticks ||
                        app.project.activeSequence.videoTracks[i].clips[j + 1] == null) {
                        //alert("the file at" + (j) + "is causing proplems");
                        break;
                    } else if ((thisCLipLength.ticks + playHeadTime) >
                        app.project.activeSequence.videoTracks[i].clips[j].start.ticks ||
                        (thisCLipLength.ticks + playHeadTime) >
                        app.project.activeSequence.videoTracks[i].clips[j + 1].start.ticks) {
                        //alert("the file at "+ j +" and at "+ (j+1) + " are causing proplems");
                        break;
                    } else {

                        //alert("Everything is clear !!we will add the clip")
                        //app.project.activeSequence.videoTracks[i].overwriteClip(FirstFileToInsert, playHeadTime);
                        theVideoFileTrack = i;
                        theVideoFileClipNo = j + 1;
                        isVideoTrackFinished = true;
                        if (isVideoTrackFinished == true) {
                            break;

                        }
                    }
                    if (isVideoTrackFinished == true) {
                        break;
                    }
                }

            }
        }
    }




    //app.project.activeSequence.videoTracks[theVideoFileTrack].insertClip(FirstFileToInsert, playHeadTime);


    //issues here is that 1 the add clip or clips will not be grouped togther 
    // another issue is that if there are any in or out points that are set they will be removed // you can get them and stor them if you want to  ProjectItem.getOutPoint()  app.project.rootItem.children[index].getOutPoint(mediaType)
    // another issue is that you have to add extra audio or video tracks if the length of the audio or video tracks are not enough




    // alert(FirstFileToInsert.getAudioChannelMapping.audioClipsNumber.toString())
    // alert(FirstFileToInsert.videoComponents().numItems.toString())
    //alert(FirstFileToInsert.type.videoComponents().toString())

    //~     if (FirstFileToInsert.getAudioChannelMapping.audioClipsNumber != 0) {
    //~         //try to select the clips 
    //~             
    //~     var originalClipLengthVIDEO = FirstFileToInsert.getOutPoint(1);
    //~     var originalClipLengthAUDIO = FirstFileToInsert.getOutPoint(2);

    //~     FirstFileToInsert.setOutPoint(0, 2); //audio is at zero


    //~     app.project.activeSequence.videoTracks[theVideoFileTrack].overwriteClip(FirstFileToInsert, playHeadTime);

    //~     FirstFileToInsert.setOutPoint(originalClipLengthAUDIO, 2);

    //~     FirstFileToInsert.setOutPoint(0, 1);
    //~  
    //~     
    //~     app.project.activeSequence.audioTracks[theAudioFileTrack].overwriteClip(FirstFileToInsert, playHeadTime);

    //~     
    //~     FirstFileToInsert.setOutPoint(originalClipLengthVIDEO, 1);
    //~     FirstFileToInsert.setOutPoint(originalClipLengthAUDIO, 2);
    //~     
    //~     
    //~     if(originalClipLengthAUDIO < 1 || originalClipLengthVIDEO < 1 ){
    //~         
    //~     FirstFileToInsert.setOutPoint(originalClipLengthVIDEO, 4);
    //~     FirstFileToInsert.setOutPoint(originalClipLengthVIDEO, 1);
    //~     FirstFileToInsert.setOutPoint(originalClipLengthAUDIO, 2);
    //~      FirstFileToInsert.setOutPoint(originalClipLengthVIDEO, 4);
    //~         
    //~         }
    //~    
    //~         
    //~         
    //~         
    //~         if(app.project.activeSequence.videoTracks[theVideoFileTrack].clips[theVideoFileClipNo]!=null){
    //~         app.project.activeSequence.videoTracks[theVideoFileTrack].clips[theVideoFileClipNo].setSelected(1, 1);
    //~         }
    //~      if(app.project.activeSequence.audioTracks[theAudioFileTrack].clips[theAudioFileClipNo]!=null){
    //~         app.project.activeSequence.audioTracks[theAudioFileTrack].clips[theAudioFileClipNo].setSelected(1, 1);
    //~         }


    //~         //might have to add a exe hot key script that presses ctrl  + k to link the audio and the video togther 
    //~         
    //~         
    //~         
    //~         
    //~         

    //~         var ahk_file_LINK_VIDEO_AUDIO = File(thePathOnlyToTheFileName + "\\AHK\\Sending CTRL And M.exe");

    //~         ahk_file_LINK_VIDEO_AUDIO.execute();
    //~         $.sleep(200);


    //~     }
    //~     else{
    //~     app.project.activeSequence.videoTracks[theVideoFileTrack].insertClip(FirstFileToInsert, playHeadTime);
    //~     }

    var newClip = seq.insertClip(FirstFileToInsert, playHeadTime, (theVideoFileTrack), (theAudioFileTrack));



}

function returnAllProjectItems() {
    
     if (!app.project.rootItem) {
        alert("rootItem is not available");
        return;
    }


    
    var ArrayOfClips=[];

    var file_paths = [];
    // breadth first traversal
    var stack = [app.project.rootItem];
    while (stack.length > 0) {
        var item = stack.shift();
        if (item === undefined || item.children === undefined || item.children.numItems < 1) continue;
        var numChildren = item.children.numItems;
        for (var i = 0; i < numChildren; i++) {
            var child = item.children[i];

            switch (child.type) {
                case ProjectItemType.CLIP:
                ArrayOfClips.push(child.name)
                    break;
                case ProjectItemType.BIN:
                    stack.push(child);
                    break;
            } // switch end
        }
    }

    if (ArrayOfClips.length == 0) {
        alert("Error !!!!     No file found!");
        return;
    }
    
    return JSON.stringify(ArrayOfClips)
    }

function SearchForAnyProjectItem(filename) {
    if (!app.project.rootItem) {
        alert("rootItem is not available");
        return;
    }

    var fileTarget;
    var counter = 0;

    var file_paths = [];
    // breadth first traversal
    var stack = [app.project.rootItem];
    while (stack.length > 0) {
        var item = stack.shift();
        if (item === undefined || item.children === undefined || item.children.numItems < 1) continue;
        var numChildren = item.children.numItems;
        for (var i = 0; i < numChildren; i++) {
            var child = item.children[i];

            switch (child.type) {
                case ProjectItemType.CLIP:
                case ProjectItemType.FILE:


                    if (child.name == filename) {
                        counter = 1;
                        fileTarget = item.children[i];
                        return fileTarget;
                        break;
                    }
                    // do something with the file_path
                    break;
                case ProjectItemType.BIN:
                    stack.push(child);
                    break;
            } // switch end
        }
    }

    if (counter == 0) {
        alert("Error !!!!     file is not found!");
        return;
    }


    return false;
}
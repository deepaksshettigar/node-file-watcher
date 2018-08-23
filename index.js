//File to be watched and updated
const filename_01 = "D:/projects/web.config";
const filename_02 = "D:/projects/modify.txt";

//Load the library and specify options
const replace = require('replace-in-file');




var filewatcher = require('filewatcher');

// the default options
var filewatcher_opts = {
    forcePolling: true,  // try event-based watching first
    debounce: 10,         // debounce events in non-polling mode by 10ms
    interval: 10000,       // if we need to poll, do it every 'n' ms
    persistent: true      // don't end the process while files are watched
  };
   
var watcher = filewatcher(filewatcher_opts);


 
// watch a file ... or a directory
// watcher.add(__filename); watch current file
watcher.add(filename_01);
watcher.add(filename_02);
 
watcher
.on('change', function(file, stat) {
    console.log('File modified: %s', file);
    if (!stat) console.log('deleted');

    try {
        var replace_options = {
            files: file,
            from: /<\/configuration>/g,
            to: '</configuration>\n<!-- Added More Code -->',
        };
        var changes = replace.sync(replace_options);
        console.log('Updated files:', changes.join(', '));
    }
    catch (error) {
        console.error('Error occurred in file modification:', error);
    }
    watcher.removeAll();
})
;


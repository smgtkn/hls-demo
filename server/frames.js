var spawn = require('child_process').spawn;

module.exports={
 runFfmpeg :function(index) {
    var cmd = '/usr/bin/ffmpeg';
    var args = [

        '-i', 'rtsp://192.168.1.159/stream1',
        '-fflags', 'flush_packets',
        '-max_delay', '2',
        '-flags',
        '-global_header',
        '-hls_time', '2',
        '-hls_list_size', '3',
        '-hls_flags', 'delete_segments',
        '-vcodec', 'copy',
        '-y', `./videos/ipcam/video${index}/index${index}.m3u8`

    ];

    var proc = spawn(cmd, args);

    proc.stdout.on('data', function (data) {
        // console.log(data);
    });

    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function (data) {
        // console.log(data);
    });

    proc.on('close', function () {
        console.log('finished');
    });
}
}

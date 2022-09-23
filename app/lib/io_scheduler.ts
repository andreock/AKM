export function get_scheduler(block: string){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec("su");  // SU is not necessary
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    outputStream.writeBytes("cat /sys/block/" + block + "/queue/scheduler\n");
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    var reader = new java.io.BufferedReader(
      new java.io.InputStreamReader(process.getInputStream())
    );
    var line = new java.lang.String();
    while ((line = reader.readLine()) != null) o += line;
    return o;
}

export function set_scheduler(block: string, scheduler: string){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec("su");
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    outputStream.writeBytes(`echo ${scheduler} > /sys/block/${block}/queue/scheduler\n`);
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    var reader = new java.io.BufferedReader(
      new java.io.InputStreamReader(process.getInputStream())
    );
    var line = new java.lang.String();
    while ((line = reader.readLine()) != null) o += line;
    return o;
}
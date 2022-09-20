// java.lang.Runtime.getRuntime().exec('su') Get SU permission

export function get_adrenoboost(){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    // Maybe change this path?
    outputStream.writeBytes("cat /sys/class/devfreq/3d00000.qcom,kgsl-3d0/adrenoboost\n");
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line=reader.readLine())!=null)o+=line;
    return o;
}

export function set_adrenoboost(adrenoboost: boolean){
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    // Maybe change this path?
    if(!adrenoboost){
        outputStream.writeBytes("echo 1 > /sys/class/devfreq/3d00000.qcom,kgsl-3d0/adrenoboost\n");
    }else{
        outputStream.writeBytes("echo 0 > /sys/class/devfreq/3d00000.qcom,kgsl-3d0/adrenoboost\n");
    }
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
}

export function get_load(){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    // Maybe change this path?
    outputStream.writeBytes("cat /sys/class/devfreq/3d00000.qcom,kgsl-3d0/gpu_load\n");
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line=reader.readLine())!=null)o+=line;
    return o;
}

export function get_gov(){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    // Maybe change this path?
    outputStream.writeBytes("cat /sys/class/devfreq/3d00000.qcom,kgsl-3d0/governor\n");
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line = reader.readLine())!=null)o+=line;
    return o;
}
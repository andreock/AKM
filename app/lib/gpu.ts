import { prompt, alert } from '@nativescript/core/ui/dialogs';

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

export function get_all_gov(){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    // Maybe change this path?
    outputStream.writeBytes("cat /sys/class/devfreq/3d00000.qcom,kgsl-3d0/available_governors\n");
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line = reader.readLine())!=null)o+=line;
    return o.split(" ");
}

export function set_gov(governor: number){
    let all_gov = get_all_gov();
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    // Maybe change this path?
    outputStream.writeBytes(`echo "${all_gov[governor]}" > /sys/class/devfreq/3d00000.qcom,kgsl-3d0/governor\n`);
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line = reader.readLine())!=null)o+=line;
    alert("Governor changed successfully");
    return o.split(" "); 
}

export function get_min_freq(){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    // Maybe change this path?
    outputStream.writeBytes("cat /sys/class/devfreq/3d00000.qcom,kgsl-3d0/min_freq\n");
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line = reader.readLine())!=null)o+=line;
    return o;
}

export function get_max_freq(){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    // Maybe change this path?
    outputStream.writeBytes("cat /sys/class/devfreq/3d00000.qcom,kgsl-3d0/max_freq\n");
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line = reader.readLine())!=null)o+=line;
    return o;
}

export function set_min_freq(min: number, max: number){
    prompt('Set frequency between ' + min + " and " + max, "")
    .then(async res => {
        if(!res.result){}else{
            if(res.text == "" || parseInt(res.text) <= min || parseInt(res.text) >= max){
                alert({
                    title: "Error",
                    message: "Invalid input!",
                    okButtonText: "OK"
                });
            }else{
                var process = java.lang.Runtime.getRuntime().exec('su');
                let outputStream = new java.io.DataOutputStream(process.getOutputStream());
                outputStream.writeBytes('echo ' + res.text + " " + '> /sys/class/devfreq/3d00000.qcom,kgsl-3d0/min_freq\n');
                outputStream.flush();
                outputStream.writeBytes("exit\n");
                outputStream.flush();
                process.waitFor();
                alert({
                    title: "Success",
                    message: "Min frequency set successfully!",
                    okButtonText: "OK"
                });
            }
        }
    })
}

export function set_max_freq(min: number, max: number){
    prompt('Set frequency between ' + min + " and " + max, "")
    .then(async res => {
        if(!res.result){}else{
            if(res.text == "" || parseInt(res.text) <= min || parseInt(res.text) >= max){
                alert({
                    title: "Error",
                    message: "Invalid input!",
                    okButtonText: "OK"
                });
            }else{
                var process = java.lang.Runtime.getRuntime().exec('su');
                let outputStream = new java.io.DataOutputStream(process.getOutputStream());
                outputStream.writeBytes('echo ' + res.text + " " + '> /sys/class/devfreq/3d00000.qcom,kgsl-3d0/max_freq\n');
                outputStream.flush();
                outputStream.writeBytes("exit\n");
                outputStream.flush();
                process.waitFor();
                alert({
                    title: "Success",
                    message: "Max frequency set successfully!",
                    okButtonText: "OK"
                });
            }
        }
    })
}

export function get_cur_freq(){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    // Maybe change this path?
    outputStream.writeBytes("cat /sys/class/devfreq/3d00000.qcom,kgsl-3d0/cur_freq\n");
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line = reader.readLine())!=null)o+=line;
    return o;
}
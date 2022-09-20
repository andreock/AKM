import { prompt, alert } from '@nativescript/core/ui/dialogs';

export function get_cpu_freq(id){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_cur_freq');
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line=reader.readLine())!=null)o+=line;
    return o;
}

export function get_cpu_max_freq(id){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_max_freq');
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line=reader.readLine())!=null)o+=line;
    return o;
}

export function get_cpu_min_freq(id){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_min_freq');
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line=reader.readLine())!=null)o+=line;
    return o;
}

export function set_max_freq(min: string , max: string, id: number){
    prompt('Set frequency between ' + min + " and " + max, "")
    .then(async res => {
        if(!res.result){}else{
            if(res.text == "" || res.text <= min || res.text >= max){
                alert({
                    title: "Error",
                    message: "Invalid input!",
                    okButtonText: "OK"
                });
            }else{
                var process = java.lang.Runtime.getRuntime().exec('su');
                let outputStream = new java.io.DataOutputStream(process.getOutputStream());
                outputStream.writeBytes('echo ' + res.text + " " + '> /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_max_freq');
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

export function set_min_freq(min: string , max: string, id: number){
    prompt('Set frequency between ' + min + " and " + max, "")
    .then(async res => {
        if(!res.result){}else{
            if(res.text == "" || res.text <= min || res.text >= max){
                alert({
                    title: "Error",
                    message: "Invalid input!",
                    okButtonText: "OK"
                });
            }else{
                var process = java.lang.Runtime.getRuntime().exec('su');
                let outputStream = new java.io.DataOutputStream(process.getOutputStream());
                outputStream.writeBytes('echo ' + res.text + " " + '> /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_min_freq');
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

export function get_gov(id: number){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_available_governors');
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    while((line=reader.readLine())!=null)o+=line;
    return o.split(" ");
}

export async function set_gov(id_cpu: number, governor: number){
    let governors = get_gov(id_cpu);
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    outputStream.writeBytes('echo ' + '"' + governors[governor] + '"' + ' /sys/devices/system/cpu/cpu' + id_cpu + '/cpufreq/scaling_governor');
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    alert("Governor update successfully");
}   

export function set_all_gov(allgov: number){
    let governors = get_gov(0);
    console.log('echo ' + '"' + governors[allgov] + '"' + ' > /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor');
    var process = java.lang.Runtime.getRuntime().exec('su');
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    outputStream.writeBytes('echo ' + '"' + governors[allgov] + '"' + ' /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor');
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
    alert("Governor update successfully");
}   
export function get_cpu_freq(id: number){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_cur_freq');
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    // @ts-ignore
    while((line=reader.readLine())!=null)o+=line;
    return o;
}

export function get_cpu_gov(id: number){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_governor');
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    // @ts-ignore
    while((line=reader.readLine())!=null)o+=line;
    return o;
}

export function get_uptime(){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('uptime');
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    // @ts-ignore
    while((line=reader.readLine())!=null)o+=line;
    return o;
}

export function get_kernel(){
    var o = new java.lang.String();
    var process = java.lang.Runtime.getRuntime().exec('uname -a');
    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
    var line = new java.lang.String();
    // @ts-ignore
    while((line=reader.readLine())!=null)o+=line;
    return o;  
}
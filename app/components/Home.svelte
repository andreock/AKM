<page>
    <actionBar title="AndreKernelManager" />
    <flexboxLayout flexDirection="column">
        <textView editable="{false}">
            <formattedString>
                <span text="Welcome to AndreKernelManager!\n"/>
                <span text="Max CPU frequncy - governor:"/>
            </formattedString>
        </textView>
        <listView items="{frequency}">
            <Template let:item>
                <label text="{item}" />
            </Template>
        </listView>
        <textView editable="{false}">
            <formattedString>

                <span text="Total RAM: {(totalMemory / 1000000000).toFixed(3)} Gb\n" />
                <span text="\n" />

                <span text="Available RAM: {(ram_available / 1000000000).toFixed(3)} Gb\n"/>
                <span text="\n" />

                <span text="Phone Manufacturer: {DeviceInfo.systemManufacturer()}\n"/>
                <span text="\n" />

                <span text="Battery level: {batterylevel} %\n"/>
                <span text="\n" />

                <span text="Uptime and loadavg: {uptime}\n"/>
                <span text="\n" />

                <span text="Kernel: {kernel}"/>
            </formattedString>
        </textView>
    </flexboxLayout>
   
</page>

<script>
    import { Template } from 'svelte-native/components';
    import { DeviceInfo } from "nativescript-dna-deviceinfo";

    let frequency = [], batterylevel = 0, ram_available = 0, totalMemory = 0, uptime = "", kernel = "";
    java.lang.Runtime.getRuntime().exec("su");

    function get_cpu_freq(id){
        var o = new java.lang.String();
        var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_cur_freq');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
        return o;
    }

    function get_cpu_gov(id){
        var o = new java.lang.String();
        var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_governor');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
        return o;
    }

    function get_uptime(){
        var o = new java.lang.String();
        var process = java.lang.Runtime.getRuntime().exec('uptime');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
        return o;
    }

    function get_kernel(){
        var o = new java.lang.String();
        var process = java.lang.Runtime.getRuntime().exec('uname -a');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
        return o;  
    }

    async function init(){
        batterylevel = DeviceInfo.batteryLevel();
        ram_available = DeviceInfo.freeMemory();
        totalMemory = DeviceInfo.totalMemory();
        frequency = [];
        uptime = get_uptime();
        kernel = get_kernel();
        for(var i = 0; i < 8; i++){
            frequency = frequency.concat("CPU " + i + ": " + get_cpu_freq(i) / 1000000 + " GHz - " + get_cpu_gov(i));
        }
        setTimeout(init, 1000);
    }

    init();
</script>

<style>
</style>

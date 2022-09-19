<page>
    <actionBar title="AndreKernelManager" />
    <flexboxLayout flexDirection="column">
        <listPicker items="{get_gov(0)}" bind:selectedIndex="{allgov}"/>
        <button text="Set governor for all CPUs" backgroundColor="#2497d1" on:tap="{set_all_gov}" height="170"/>
        <listView items="{frequency}">
            <Template let:item>
                <label text="CPU {item.id} Max: {item.max} Min: {item.min} Current: {item.current}" />
                <button text="Adjust maximium frequncy" backgroundColor="#2497d1" on:tap="{set_max_freq(item.min, item.max, item.id)}"/>
                <button text="Adjust minimium frequncy" backgroundColor="#2497d1" on:tap="{set_min_freq(item.min, item.max, item.id)}"/>
                <listPicker items="{get_gov(item.id)}" bind:selectedIndex="{governor}"/>
                <button text="Set governor" backgroundColor="#2497d1" on:tap="{set_gov(item.id)}"/>
            </Template>
        </listView>
    </flexboxLayout>
</page>

<script>
    import { Template } from 'svelte-native/components';
    import { prompt, alert } from '@nativescript/core/ui/dialogs';

    let frequency = [], governor = 0, allgov = 0;

    function get_cpu_freq(id){
        var o = new java.lang.String();
        var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_cur_freq');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
        return o;
    }

    function get_cpu_max_freq(id){
        var o = new java.lang.String();
        var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_max_freq');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
        return o;
    }

    function get_cpu_min_freq(id){
        var o = new java.lang.String();
        var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_min_freq');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
        return o;
    }

    function set_max_freq(min , max, id){
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
                    await java.lang.Runtime.getRuntime().exec("su");
                    await java.lang.Runtime.getRuntime().exec('echo userspace > /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_governor');
                    java.lang.Runtime.getRuntime().exec('echo ' + res.text + " " + '> /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_max_freq');
                    alert({
                        title: "Success",
                        message: "Max frequency set successfully!",
                        okButtonText: "OK"
                    });
                }
            }
        })
    }

    function set_min_freq(min , max, id){
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
                    await java.lang.Runtime.getRuntime().exec("su");
                    await java.lang.Runtime.getRuntime().exec('echo userspace > /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_governor');
                    java.lang.Runtime.getRuntime().exec('echo ' + res.text + " " + '> /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_min_freq');
                    alert({
                        title: "Success",
                        message: "Min frequency set successfully!",
                        okButtonText: "OK"
                    });
                }
            }
        })
    }

    function get_gov(id){
        var o = new java.lang.String();
        var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_available_governors');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
        return o.split(" ");
    }

    async function set_gov(id_cpu){
        await java.lang.Runtime.getRuntime().exec("su");
        let governors = get_gov(id_cpu);
        //console.log('echo ' + governors[governor] + ' /sys/devices/system/cpu/cpu' + id_cpu + '/cpufreq/scaling_available_governors');
        var process = java.lang.Runtime.getRuntime().exec('echo ' + governors[governor] + ' /sys/devices/system/cpu/cpu' + id_cpu + '/cpufreq/scaling_governor');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
    }   

    async function set_all_gov(){
        await java.lang.Runtime.getRuntime().exec("su");
        let governors = get_gov(0);
        console.log('echo ' + governors[allgov] + ' /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor');
        var process = java.lang.Runtime.getRuntime().exec('echo ' + governors[allgov] + ' /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        alert("Governor update successfully");
        while((line=reader.readLine())!=null)o+=line;
    }   

    function init(){
        frequency = [];
        for(var i = 0; i < 8; i++){
            frequency = frequency.concat({
                id: i,
                max: get_cpu_max_freq(i),
                min: get_cpu_min_freq(i),
                current: get_cpu_freq(i)
            });
        }
        setTimeout(init, 1000);
    }

    init();
</script>

<style>
</style>

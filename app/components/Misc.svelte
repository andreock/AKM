<page>
    <flexboxLayout flexDirection="column">

        <flexboxLayout alignItems="flex-start">
            <label text="USB2 fast charge" class="fsync"/>
            <switch bind:checked="{fsync}" on:checkedChange={fsync_switch}/>
        </flexboxLayout>

        <flexboxLayout alignItems="flex-start">
            <label text="Enable 600hz touch sampling(only oplus)" class="fsync"/>
            <switch bind:checked="{touchrate}" on:checkedChange={touchrate_switch}/>
        </flexboxLayout>

        <flexboxLayout alignItems="flex-start">
            <label text="Adrenoboost" class="fsync"/>
            <switch bind:checked="{adrenoboost}" on:checkedChange={set_adrenoboost}/>
        </flexboxLayout>
        
    </flexboxLayout>
</page>

<script>
    import { onMount } from 'svelte';

    let fsync = false, touchrate = false, adrenoboost = false;

    function get_adrenoboost(){
        var o = new java.lang.String();
        var process = java.lang.Runtime.getRuntime().exec('su');
        let outputStream = new java.io.DataOutputStream(process.getOutputStream());
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

    function set_adrenoboost(){
        var process = java.lang.Runtime.getRuntime().exec('su');
        let outputStream = new java.io.DataOutputStream(process.getOutputStream());
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

    function get_oplus_touchrate(){
        var o = new java.lang.String();
        var process = java.lang.Runtime.getRuntime().exec('su');
        let outputStream = new java.io.DataOutputStream(process.getOutputStream());
        outputStream.writeBytes("cat /proc/touchpanel/game_switch_enable\n");
        outputStream.flush();
        outputStream.writeBytes("exit\n");
        outputStream.flush();
        process.waitFor();
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
        return o;
    }

    function touchrate_switch(){
        if(!touchrate){
            var process = java.lang.Runtime.getRuntime().exec('su');
            let outputStream = new java.io.DataOutputStream(process.getOutputStream());
            outputStream.writeBytes("echo 1 > /proc/touchpanel/game_switch_enable\n");
            outputStream.flush();
            outputStream.writeBytes("exit\n");
            outputStream.flush();
            process.waitFor();
        }else{
            var process = java.lang.Runtime.getRuntime().exec('su');
            let outputStream = new java.io.DataOutputStream(process.getOutputStream());
            outputStream.writeBytes("echo 0 > /proc/touchpanel/game_switch_enable\n");
            outputStream.flush();
            outputStream.writeBytes("exit\n");
            outputStream.flush();
            process.waitFor();
        }
    }

    function fsync_switch() { 
        if(fsync){
            var process = java.lang.Runtime.getRuntime().exec('su');
            let outputStream = new java.io.DataOutputStream(process.getOutputStream());
            outputStream.writeBytes("echo 1 > /sys/kernel/fast_charge/force_fast_charge\n");
            outputStream.flush();
            outputStream.writeBytes("exit\n");
            outputStream.flush();
            process.waitFor();
        }else{
            var process = java.lang.Runtime.getRuntime().exec('su');
            let outputStream = new java.io.DataOutputStream(process.getOutputStream());
            outputStream.writeBytes("echo 0 > /sys/kernel/fast_charge/force_fast_charge\n");
            outputStream.flush();
            outputStream.writeBytes("exit\n");
            outputStream.flush();
            process.waitFor();
        }
    }

    onMount(() => {
        touchrate = Boolean(parseInt(get_oplus_touchrate()[0]));
        adrenoboost = Boolean(parseInt(get_adrenoboost()));
    }
    );
    
</script>

<style>
    .fsync{
        margin-top: 50px;
        margin-left: 20px;
    }
</style>
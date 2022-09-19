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
        
    </flexboxLayout>
</page>

<script>
    let fsync = false, touchrate = false;
    import { onMount } from 'svelte';

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
            outputStream.writeBytes("echo 1 /sys/kernel/fast_charge/force_fast_charge\n");
            outputStream.flush();
            outputStream.writeBytes("exit\n");
            outputStream.flush();
            process.waitFor();
        }else{
            var process = java.lang.Runtime.getRuntime().exec('su');
            let outputStream = new java.io.DataOutputStream(process.getOutputStream());
            outputStream.writeBytes("echo 0 /sys/kernel/fast_charge/force_fast_charge\n");
            outputStream.flush();
            outputStream.writeBytes("exit\n");
            outputStream.flush();
            process.waitFor();
        }
    }
    onMount(() => touchrate = Boolean(get_oplus_touchrate()[0]));
    
</script>

<style>
    .fsync{
        margin-top: 50px;
        margin-left: 20px;
    }
</style>
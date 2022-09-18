<page>
    <actionBar title="AndreKernelManager" />
    <textView editable="{false}">
        <formattedString>
            <span text="Welcome to AndreKernelManager!"/>
        </formattedString>
    </textView>
    <listView items="{frequency}">
        <Template let:item>
            <!-- Shows the list item label in the default color and style. -->
            <label text="{item}" />
        </Template>
    </listView>
</page>

<script>
    import { Template } from 'svelte-native/components'
    let frequency = [];
    function get_cpu_freq(id){
        var o = new java.lang.String();
        
        var process = java.lang.Runtime.getRuntime().exec('cat /sys/devices/system/cpu/cpu' + id + '/cpufreq/scaling_cur_freq');
        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        var line = new java.lang.String();
        while((line=reader.readLine())!=null)o+=line;
        return o;
    }

    function init(){
        java.lang.Runtime.getRuntime().exec("su");
        for(var i = 0; i < 8; i++){
            frequency.push(get_cpu_freq(i));
        }
    }
    setTimeout(init, 500)
    init();
</script>

<style>
</style>

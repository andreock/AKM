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

<script lang="ts">
    import { Template } from 'svelte-native/components';
    import { DeviceInfo } from "nativescript-dna-deviceinfo";
    import { get_cpu_freq, get_cpu_gov, get_uptime, get_kernel } from '../lib/home';

    let frequency: Array<String> = [], batterylevel = 0, ram_available = 0, totalMemory = 0, uptime: java.lang.String, kernel: java.lang.String;
    java.lang.Runtime.getRuntime().exec("su");

    async function init(){
        batterylevel = DeviceInfo.batteryLevel();
        ram_available = DeviceInfo.freeMemory();
        totalMemory = DeviceInfo.totalMemory();
        frequency = [];
        uptime = get_uptime();
        kernel = get_kernel();
        for(var i = 0; i < 8; i++){
            frequency = frequency.concat("CPU " + i + ": " + parseFloat(get_cpu_freq(i) as unknown as string) / 1000000 + " GHz - " + get_cpu_gov(i));
        }
        setTimeout(init, 1000);
    }

    init();
</script>

<style>
</style>

<page>
    <textView editable="{false}">
        <formattedString>
            <span text="Battery level: {DeviceInfo.batteryLevel()} %" />
        </formattedString>
    </textView>
</page>

<script>
    import { DeviceInfo } from "nativescript-dna-deviceinfo";
</script>
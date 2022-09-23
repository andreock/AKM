<page>
    <textView editable="{false}">
        <formattedString>
            <span text="Battery level: {DeviceInfo.batteryLevel()} % ({capacity} mAh)\n" />
            <span text="Voltage: {voltage} V\n" />
            <span text="Current: -{ma_now} ma\n" />
            <span text="Is charging? {charge}" />
        </formattedString>
    </textView>
</page>

<script>
    import { DeviceInfo } from "nativescript-dna-deviceinfo";
    import { Utils } from '@nativescript/core'

    let voltage = 0, capacity = 0, ma_now = 0, charge = false;

    function get_voltage(){
        const bm = Utils.android.getApplicationContext().registerReceiver(null, new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED));
        voltage = bm.getIntExtra(android.os.BatteryManager.EXTRA_VOLTAGE, 0) / 1000;
        setTimeout(get_voltage, 1000);
    }

    function get_mah(){
        const bm_service = Utils.android
            .getApplicationContext()
            .getSystemService(android.content.Context.BATTERY_SERVICE)
        let counter = bm_service.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CHARGE_COUNTER);
        let capacity_raw = bm_service.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY);
        capacity = (((counter/capacity_raw) *100) / 1000).toFixed(3);
        setTimeout(get_mah, 1000);
    }

    function get_ma_now(){
        const bm_service = Utils.android
            .getApplicationContext()
            .getSystemService(android.content.Context.BATTERY_SERVICE)
        ma_now = bm_service.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CURRENT_NOW);
        setTimeout(get_ma_now, 1000);
    }

    function isCharging(){
        charge = DeviceInfo.isBatteryCharging();
        setTimeout(isCharging, 5000);
    }

    get_voltage();
    get_ma_now();
    get_mah();
    isCharging();

</script>   
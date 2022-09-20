// Get 600hz mode for Oplus model
export function get_oplus_touchrate() {
  var o = new java.lang.String();
  var process = java.lang.Runtime.getRuntime().exec("su");
  let outputStream = new java.io.DataOutputStream(process.getOutputStream());
  outputStream.writeBytes("cat /proc/touchpanel/game_switch_enable\n");
  outputStream.flush();
  outputStream.writeBytes("exit\n");
  outputStream.flush();
  process.waitFor();
  var reader = new java.io.BufferedReader(
    new java.io.InputStreamReader(process.getInputStream())
  );
  var line = new java.lang.String();
  while ((line = reader.readLine()) != null) o += line;
  return o;
}

// Switch Touchrate
export function touchrate_switch(touchrate: boolean) {
  if (!touchrate) {
    var process = java.lang.Runtime.getRuntime().exec("su");
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    outputStream.writeBytes("echo 1 > /proc/touchpanel/game_switch_enable\n");
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
  } else {
    var process = java.lang.Runtime.getRuntime().exec("su");
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    outputStream.writeBytes("echo 0 > /proc/touchpanel/game_switch_enable\n");
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
  }
}

// Switch fast charge option
export function fsync_switch(fsync: boolean) {
  if (!fsync) {
    var process = java.lang.Runtime.getRuntime().exec("su");
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    outputStream.writeBytes(
      "echo 1 > /sys/kernel/fast_charge/force_fast_charge\n"
    );
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
  } else {
    var process = java.lang.Runtime.getRuntime().exec("su");
    let outputStream = new java.io.DataOutputStream(process.getOutputStream());
    outputStream.writeBytes(
      "echo 0 > /sys/kernel/fast_charge/force_fast_charge\n"
    );
    outputStream.flush();
    outputStream.writeBytes("exit\n");
    outputStream.flush();
    process.waitFor();
  }
}

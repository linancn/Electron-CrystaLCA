import * as child from "child_process";

export default function DockerStop(platform: string) {
  switch (platform) {
    case "win32":
      child.spawnSync("cmd.exe", ["/C", "docker-stop.bat"]);
      break;
    case "darwin":
      child.spawnSync("/bin/sh", ["-c", "/Applications/CrystaLCA.app/Contents/docker-stop.sh"]);
      break;
    default:
      child.spawnSync("/bin/sh", ["-c", "/opt/CrystaLCA/docker-stop-ubuntu.sh"]);
      break;
  }
}

async function pm2AppAction(appName, action) {
  if (action === "reload") return location.reload();
  await fetch(`/api/apps/${appName}/${action}`, { method: "POST" });
  location.reload();
}

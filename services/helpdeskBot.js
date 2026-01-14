export function getBotReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hello 👋 How can I assist you today?";
  }

  if (msg.includes("vehicle")) {
    return "You can check your vehicle health from the Vehicle section 🚗";
  }

  if (msg.includes("service")) {
    return "Service booking is available from the dashboard.";
  }

  if (msg.includes("login")) {
    return "If you're facing login issues, try resetting your password.";
  }

  if (msg.includes("help")) {
    return "Sure! Please tell me what you need help with 😊";
  }

  return "I'm still learning 🤖 Please try asking something else.";
}
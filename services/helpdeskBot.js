export function getBotReply(message) {
  const msg = message.toLowerCase();

  // Greetings
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello 👋 Welcome to our Car Assist. How can I help you today?";
  }

  // Vehicle Health
  if (msg.includes("vehicle health") || msg.includes("car health")) {
    return "🚗 You can view real-time vehicle health insights in the Vehicle Health section.";
  }

  if (msg.includes("engine failure") || msg.includes("engine risk") || msg.includes("engine issue")) {
    return "⚠️ Attention! Your car shows signs of potential engine failure and needs close monitoring.";
  }

  if (msg.includes("monitor") || msg.includes("alert") || msg.includes("warning")) {
    return "🚨 Alert: Your vehicle requires immediate attention. Please monitor its condition closely.";
  }

  // Service & Maintenance
  if (msg.includes("service")) {
    return "🛠️ You can book, reschedule, or track your service from the dashboard.";
  }

  if (msg.includes("maintenance") || msg.includes("checkup")) {
    return "Regular maintenance helps avoid breakdowns. Would you like to schedule a service?";
  }

  if (msg.includes("next service")) {
    return "📅 Your next service date is available in the Service History section.";
  }

  // Breakdown & Emergency
  if (msg.includes("breakdown") || msg.includes("car stopped")) {
    return "🚨 Sorry to hear that. Please enable roadside assistance from the Help section immediately.";
  }

  if (msg.includes("roadside")) {
    return "🆘 Roadside assistance can be requested directly from the app anytime.";
  }

  // Driving Behavior
  if (msg.includes("driving score") || msg.includes("driving behavior")) {
    return "📊 Your driving score reflects acceleration, braking, and engine stress patterns.";
  }

  if (msg.includes("harsh braking") || msg.includes("harsh acceleration")) {
    return "⚠️ Frequent harsh driving may impact vehicle health and fuel efficiency.";
  }

  // Fuel & Performance
  if (msg.includes("fuel") || msg.includes("mileage")) {
    return "⛽ You can track fuel efficiency and driving trends in the Performance section.";
  }

  if (msg.includes("performance")) {
    return "🚀 Vehicle performance insights are available based on real-time sensor data.";
  }

  // Safety
  if (msg.includes("safety") || msg.includes("risk")) {
    return "🛡️ Safety alerts are generated automatically to help prevent potential failures.";
  }

  // App & Account
  if (msg.includes("login")) {
    return "If you're facing login issues, try resetting your password or verifying your OTP.";
  }

  if (msg.includes("account") || msg.includes("profile")) {
    return "👤 You can manage your profile and vehicle details from the Account section.";
  }

  // Ownership & Warranty
  if (msg.includes("warranty")) {
    return "📄 Warranty details for your vehicle are available under Vehicle Documents.";
  }

  if (msg.includes("insurance")) {
    return "🛡️ You can view or renew your insurance directly through the app.";
  }

  // Sales & Models
  if (msg.includes("new car") || msg.includes("models")) {
    return "🚘 We offer multiple models with advanced safety and AI-based monitoring features.";
  }

  if (msg.includes("price") || msg.includes("cost")) {
    return "💰 Pricing details depend on the model and variant. Would you like me to guide you?";
  }

  // Help & Support
  if (msg.includes("help") || msg.includes("support")) {
    return "😊 I'm here to help! Please tell me what you need assistance with.";
  }

  if (msg.includes("contact") || msg.includes("customer care")) {
    return "📞 You can reach customer support directly from the Help section of the app.";
  }

  // Default
  return "Please contact customer support for detailed assistance";
}

import sequelize from "./src/config/database.js";
import { Campaign, Subscriber, Analytics } from "./src/models/index.js";

const seedDatabase = async () => {
  try {
    console.log("Starting database seed...");

    /* 1️⃣ Connect & Sync */
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // resets DB
    console.log("✅ Database synced");

    const subscribers = await Subscriber.bulkCreate(
      [
        { name: "A", email: "A@test.com" },
        { name: "B", email: "B@test.com" },
        { name: "C", email: "C@test.com" },
        { name: "D", email: "D@test.com" },
        { name: "E", email: "E@test.com" },
        { name: "F", email: "F@test.com" },
        { name: "G", email: "G@test.com" },
        { name: "H", email: "H@test.com" },
        { name: "I", email: "I@test.com" },
        { name: "J", email: "J@test.com" },
        { name: "K", email: "K@test.com" },
        { name: "L", email: "L@test.com" },
        { name: "M", email: "M@test.com" },
        { name: "N", email: "N@test.com" },
        { name: "O", email: "O@test.com" },
        { name: "P", email: "P@test.com" },
        { name: "Q", email: "Q@test.com" },
        { name: "R", email: "R@test.com" },
        { name: "S", email: "S@test.com" },
        { name: "T", email: "T@test.com" },
        { name: "U", email: "U@test.com" },
        { name: "V", email: "V@test.com" },
        { name: "W", email: "W@test.com" },
        { name: "X", email: "X@test.com" },
        { name: "Y", email: "Y@test.com" },
        { name: "Z", email: "Z@test.com" },
        { name: "P", email: "P@tes.com" },
        { name: "Q", email: "Q@tes.com" },
        { name: "R", email: "R@tes.com" },
        { name: "S", email: "S@tes.com" },
        { name: "T", email: "T@tes.com" },
        { name: "U", email: "U@tes.com" },
        { name: "V", email: "V@tes.com" },
        { name: "W", email: "W@tes.com" },
        { name: "X", email: "X@tes.com" },
        { name: "Y", email: "Y@tes.com" },
        { name: "Z", email: "Z@tes.com" },
      ],
      { returning: true }
    );

    console.log(`Subscribers created: ${subscribers.length}`);

    const campaigns = await Campaign.bulkCreate(
      [
        {
          title: "Welcome Campaign",
          emailSubject: "Welcome to Pulse ",
          content: "<h1>Welcome!</h1><p>Thanks for joining Pulse.</p>",
          status: "sent",
          sentAt: new Date(),
        },
        {
          title: "Feature Update",
          emailSubject: "New Features Released ",
          content: "<p>We have released new features.</p>",
          status: "sent",
          sentAt: new Date(),
        },
        {
          title: "Draft Campaign",
          emailSubject: "Upcoming Announcement",
          content: "<p>Something exciting is coming.</p>",
          status: "draft",
        },
        {
          title: "Getting Started Guide",
          emailSubject: "Get Started with Pulse",
          content:
            "<h1>Getting Started</h1><p>Learn how to use Pulse step by step.</p>",
          status: "sent",
          sentAt: new Date(),
        },
        {
          title: "Product Update",
          emailSubject: "New Features in Pulse",
          content: "<h1>New Features</h1><p>Check out what's new in Pulse.</p>",
          status: "sent",
          sentAt: new Date(),
        },
        {
          title: "Tips & Tricks",
          emailSubject: "Boost Your Productivity with Pulse",
          content:
            "<h1>Tips & Tricks</h1><p>Discover smart ways to use Pulse.</p>",
          status: "sent",
          sentAt: new Date(),
        },
        {
          title: "Weekly Newsletter",
          emailSubject: "Pulse Weekly Updates",
          content:
            "<h1>This Week at Pulse</h1><p>Here’s what happened this week.</p>",
          status: "sent",
          sentAt: new Date(),
        },
        {
          title: "Security Notice",
          emailSubject: "Your Pulse Account Security",
          content:
            "<h1>Security Update</h1><p>Your account security is important to us.</p>",
          status: "sent",
          sentAt: new Date(),
        },
        {
          title: "Feature Spotlight",
          emailSubject: "Explore Pulse Analytics",
          content:
            "<h1>Analytics Spotlight</h1><p>Track your performance with Pulse analytics.</p>",
          status: "sent",
          sentAt: new Date(),
        },
        {
          title: "Feedback Request",
          emailSubject: "We’d Love Your Feedback",
          content:
            "<h1>Your Feedback Matters</h1><p>Help us improve Pulse.</p>",
          status: "sent",
          sentAt: new Date(),
        },
        {
          title: "Thank You Campaign",
          emailSubject: "Thanks for Being with Pulse",
          content:
            "<h1>Thank You</h1><p>We appreciate having you with Pulse.</p>",
          status: "sent",
          sentAt: new Date(),
        },
      ],
      { returning: true }
    );

    console.log(`Campaigns created: ${campaigns.length}`);

    /* 4️⃣ Generate Analytics (≥30% opens per sent campaign) */
    for (const campaign of campaigns) {
      if (campaign.status !== "sent") continue;

      const minOpens = Math.ceil(subscribers.length * 0.3);

      // shuffle subscribers (safe copy)
      const shuffled = [...subscribers].sort(() => 0.5 - Math.random());

      const openedSubscribers = shuffled.slice(0, minOpens);

      const analyticsData = openedSubscribers.map((subscriber) => ({
        campaign_id: campaign.id,
        subscriber_id: subscriber.id,
        openedAt: new Date(),
      }));

      await Analytics.bulkCreate(analyticsData);

      console.log(
        `Analytics generated for campaign "${campaign.title}" → ${analyticsData.length} opens`
      );
    }

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();

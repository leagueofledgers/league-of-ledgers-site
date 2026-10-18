type Inquiry = { name: string; email: string; message: string };

export async function sendInquiryToHubSpot(inquiry: Inquiry): Promise<boolean> {
  // Public destination verified against the published discovery-call form.
  const portalId = process.env.HUBSPOT_PORTAL_ID?.trim() || "247697012";
  const formId = process.env.HUBSPOT_INQUIRY_FORM_ID?.trim() || "3a13f728-8b6b-4561-b5ea-7807f8ea9c87";
  const nameField = process.env.HUBSPOT_INQUIRY_NAME_FIELD?.trim() || "website_inquiry_name";
  const messageField = process.env.HUBSPOT_INQUIRY_MESSAGE_FIELD?.trim() || "message";
  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${encodeURIComponent(portalId)}/${encodeURIComponent(formId)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(8000),
        body: JSON.stringify({
          fields: [
            { objectTypeId: "0-1", name: nameField, value: inquiry.name },
            { objectTypeId: "0-1", name: "email", value: inquiry.email },
            { objectTypeId: "0-1", name: messageField, value: inquiry.message },
          ],
          context: { pageUri: "https://www.leagueofledgers.com/", pageName: "Book a Free Discovery Call" },
        }),
      },
    );
    if (!response.ok) {
      console.error(`HubSpot rejected the inquiry form submission (HTTP ${response.status}).`);
      return false;
    }
    return true;
  } catch {
    console.error("HubSpot inquiry form submission failed or timed out.");
    return false;
  }
}

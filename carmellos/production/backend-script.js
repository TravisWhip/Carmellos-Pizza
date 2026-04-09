import { Permissions, webMethod } from 'wix-web-module'
import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend';

// Submits an API Lead request to HouseCall Pro from the Wix forms.
export const submitToHousecallPro = webMethod(
    Permissions.Anyone,
    async (rawPayload) => {
        // Format address
        const address = rawPayload.address;
        const number = address?.streetAddress?.number ?? "";
        const name = address?.streetAddress?.name ?? "";
        const streetNumberAndAddress = [number, name].filter(Boolean).join(" ");
        const isAddressComplete = address?.streetAddress?.number && address?.streetAddress?.name && address?.city

        // Format time: "12:34:00.000" → "12:34 AM/PM"
        const rawTime = rawPayload.time;
        const [hours, minutes] = rawTime.split(':');
        const h = parseInt(hours);
        const formattedTime = (h % 12 || 12) + ":" + minutes + (h >= 12 ? " PM" : " AM");

        // Format date
        const rawDate = rawPayload.date;
        const dateStr = rawDate.toString();
        const formattedDate = rawDate
            ? rawDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }).replace(/,/g, '')
            : "";
        // Extract the timezone portion, e.g. "(Eastern Daylight Time)"
        const timezone = dateStr.match(/\(.*\)/)?.[0] ?? "";

        // Build note
        let note = "";
        note += "Start time: " + formattedTime + "\n";
        note += "Type of event: " + rawPayload.eventType + "\n";
        note += "Date of event: " + formattedDate + ", " + formattedTime + " " + timezone + "\n";
        note += "Number of guests: " + rawPayload.numberOfGuests + "\n";
        note += "How did you hear about us: " + rawPayload.hearAboutUs + "\n";
        if (!isAddressComplete ){
            // Log provided address in Note section
            note += "Address: " + (address ? address?.formatted : "Address Error");
            note += "\n"
        }
        note += "Additional customer notes: " + rawPayload.additionalNotes + "\n";

        // Build HCP payload
        const housecallProPayload = {
            customer: {
                first_name: rawPayload.firstName,
                last_name: rawPayload.lastName,
                email: rawPayload.email,
                notifications_enabled: rawPayload.notificationsEnabled,
                mobile_number: rawPayload.mobileNumber,
                notes: rawPayload.additionalNotes,
                addresses: [
                    {
                        city: address?.city ?? "",
                        state: address?.subdivision ?? "",
                        street: streetNumberAndAddress ?? "",
                        zip: address?.postalCode ?? ""
                    }
                ]
            },
            lead_source: "wix",
            note: note
        };

        console.log("Formatted HCP payload:", JSON.stringify(housecallProPayload));

        const apiKey = await getSecret("house_call_pro_API_token"); // PRIVATE API KEY - KEEP IN BACKEND

        const res = await fetch("https://api.housecallpro.com/leads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiKey
            },
            body: JSON.stringify(housecallProPayload)
        });

        return res.json();
    }
);
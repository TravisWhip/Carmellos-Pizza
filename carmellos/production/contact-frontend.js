// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { submitToHousecallPro } from 'backend/housecallpro.web';


$w.onReady(function () {
    $w('#button1').onClick(async () => {
        const fields = [
            '#input2', '#input3', '#input4', '#input7',
            '#input8', '#input9', '#addressInput1',
            '#timePicker1', '#datePicker1', '#dropdown1', '#textBox1'
        ];

        // Trigger validation UI on all fields
        fields.forEach(id => $w(id).updateValidityIndication());

        // Check if every field is valid
        const allValid = fields.every(id => $w(id).valid);

        if (!allValid) {
            console.log("Not all required fields populated, not submitting to HCP yet.");
            return;
        }

        // Gather raw form values to send to HouseCall Pro
        const rawPayload = {
            firstName: $w('#input3').value,
            lastName: $w('#input2').value,
            email: $w('#input9').value,
            mobileNumber: $w('#input8').value,
            address: $w('#addressInput1').value,
            time: $w('#timePicker1').value,
            date: $w('#datePicker1').value,
            eventType: $w('#input4').value,
            numberOfGuests: $w('#input7').value,
            hearAboutUs: $w('#dropdown1').value,
            additionalNotes: $w('#textBox1').value,
            notificationsEnabled: $w('#checkbox1').checked
        };

        try {
            const data = await submitToHousecallPro(rawPayload);
            console.log("HCP Submission success.");
        } catch (err) {
            console.error("HCP Submission failed:", err);
        }
    });
});
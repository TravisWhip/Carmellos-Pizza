// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { submitToHousecallPro } from 'backend/housecallpro.web';


$w.onReady(function () {
    $w('#button1').onClick(async () => {
        const fields = [
            '#input1', '#input2', '#input8', '#input4',
            '#addressInput1', '#timePicker1', '#datePicker1',
            '#input7', '#input6', '#dropdown1', '#textBox1', '#checkbox1'
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
            firstName: $w('#input1').value,
            lastName: $w('#input2').value,
            email: $w('#input8').value,
            mobileNumber: $w('#input4').value,
            address: $w('#addressInput1').value,
            time: $w('#timePicker1').value,
            date: $w('#datePicker1').value,
            eventType: $w('#input7').value,
            numberOfGuests: $w('#input6').value,
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
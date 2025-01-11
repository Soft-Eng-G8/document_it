// to run do npx prisma db seed

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {


    const categories = [
        {
            title: 'civil status',
            description: 'The civil status branch is one of the most active and important branches in the municipal administration due to its multiple tasks mainly related to issuing various documents to form administrative files that concern its daily affairs. It is also considered the face of the municipality, as citizens often judge it based on the civil status service and the quality of administrative service it provides. Among the most important tasks it handles are: Preparing all types of civil status records,Issuing all civil status documents,Periodically counting births, marriages, and deaths,Registering judgments related to civil status and marginal notes'
        },
        {
            title: 'Bio-metric services',
            description: 'The biometric services branch is one of the most important branches in the province administration, as it is responsible for issuing biometric documents such as the national identity card and the passport. It is also responsible for the renewal of these documents and the issuance of duplicates in the event of loss or theft.'
        }
    ]

    const createdCategories = await Promise.all(
        categories.map(category =>
            prisma.category.create({
                data: category
            })
        )
    )

    const categoryMap = new Map(
        createdCategories.map(category => [category.title.toLowerCase(), category])
    )

    // you should collapse things here in the editor to make it easier to read
    const documents = [
        {
            "title": "National Identity Card",
            "description": "The national identity card is a document that certifies the identity of the person concerned. It is mandatory for all Algerian nationals residing in Algeria and abroad. The national identity card is issued by the administrative district or the district for residents on the national territory.\nThe application file for the national identity card is submitted to the administrative district or the district for residents on the national territory. It must be submitted by the person concerned in person (fil a form). Upon submission of the file, the person concerned is given a receipt.\nThe applicant for the national identity card must submit the following documents: - A form filled out and signed by the person concerned or the legal guardian for minors, accompanied by the following: 1. Extract from birth certificate contracts No. 12 for the person concerned, 2. Algerian nationality certificate, 3. Birth certificate of the father or mother and if this is not possible, a death certificate of one of them, 4. Residence certificate issued less than six (6) months ago, 5. Family certificate of civil status for married persons, 6. Four (4) recent, identical, digital, color passport photos, 7. Tax coupon or tax stamp with an amount appropriate to the type of document requested. 8. Copy of blood type card. The issuance of the national identity card is not subject to any age requirement.",
            "requirements": [
                "Extract from birth certificate contracts No. 12 for the person concerned",
                "Algerian nationality certificate",
                "Birth certificate of the father or mother and if this is not possible, a death certificate of one of them",
                "Residence certificate issued less than six (6) months ago",
                "Family certificate of civil status for married persons",
                "Four (4) recent, identical, digital, color passport photos",
                "Tax coupon or tax stamp with an amount appropriate to the type of document requested",
                "Copy of blood type card"
            ],
            "category": "Bio-metric services"
        },
        {
            "title": "Biometric Passport for Algerian Citizens living in Algeria",
            "description": "The biometric passport application is made at any municipality, district or administrative district in the same wilaya or at the consular service of the place of residence for Algerian citizens residing abroad. The passport is issued upon filing the application and entering the biometric data of the applicant.\nCitizens can get appointments directly online.",
            "requirements": [
                "Biometric passport application form filled out and signed by the person concerned or the legal guardian for minors, which is accompanied by the following: Extract from birth certificates No. 12-K, issued in a special form",
                "Nationality certificate in case of applying for the first time",
                "In the case of submitting a renewal application, the expired passport, accompanied by the birth certificate of the father or mother, and if this is not possible, and the death certificate of one of them",
                "Residence certificate issued less than six (6) months ago",
                "Work certificate for workers and employees or school certificate for students or school children",
                "Four color, digital, recent and identical passport photos specifically for the biometric passport",
                "A tax stamp whose amount corresponds to the nature of the document requested",
                "Copy of blood type card",
                "In case of loss, theft or damage, the renewal file is accompanied by a special declaration"
            ],
            "category": "Bio-metric services"
        },
        {
            "title": "Biometric Passport for Algerian Citizens living outside Algeria",
            "description": "Where is the request made?\nThe biometric passport application is made at any municipality, district or administrative district in the same wilaya or at the consular service of the place of residence for Algerian citizens residing abroad.\nThe passport is issued upon filing the application and entering the biometric data of the applicant.\nWhen and how is the biometric passport withdrawn?\nThe biometric passport is withdrawn by the person concerned in person,\nA short text message is sent to the applicant inviting him to withdraw his passport,\nDuring the withdrawal process, the personal information printed on the travel document is verified in the presence of the person concerned,\nThe biometric passport is handed over to its owner in exchange for signing a receipt,\nWhat is the validity period?\nThe validity period of the passport is estimated at ten (10) years for adults and five (5) years for minors.",
            "requirements": [
                "Biometric passport application form filled out and signed by the person concerned or the legal guardian for minors, which is accompanied by the following:",
                "Special extract from birth certificates No. 12-K",
                "Consular registration card valid",
                "Document proving residence abroad",
                "Work certificate for workers and employees or school certificate for students or school children",
                "Four color, digital, recent and identical passport photos specifically for the biometric passport",
                "Tax stamp corresponding to the amount of the required document",
                "Copy of blood type card",
                "In case of loss, theft or damage, the renewal file is accompanied by a declaration to that effect."
            ],
            "category": "Bio-metric services"
        },
        {
            "title": "Signature Certification",
            "description": "Signature certification\nThe certification of the signature is done in the presence of the person concerned and upon presentation of the identity card.",
            "requirements": [],
            "category": "civil status"
        },
        {
            "title": "Residence Certificate",
            "description": "Residence certificate\nThe residence certificate is issued based on the submission of certain documents that prove the residence of the applicant.",
            "requirements": [
                "The last two rental receipts.",
                "Lease or housing benefit contract.",
                "The last electricity and gas bill.",
                "The last water service bill.",
                "Decision to allocate a functional housing.",
                "Copy of the ownership contract."
            ],
            "category": "civil status"
        },
        {
            "title": "Error Correction File",
            "description": "Error correction file in the birth certificate and marriage contract",
            "requirements": [
                "In the birth certificate and marriage contract:",
                "A certified application (issued by the archive office)",
                "Birth certificate of the person concerned",
                "Birth certificate of the father",
                "Birth certificate of the mother",
                "Parents' marriage contract",
                "Family certificate."
            ],
            "category": "civil status"
        }
    ]

    // Create contributions
    for (const doc of documents) {
        const category = categoryMap.get(doc.category.toLowerCase())
        if (!category) continue

        const contribution = await prisma.contribution.create({
            data: {
                userId: "cm5bixjo20000o54cxfrsq5l4",
                reviewerId: null,
                newTitle: doc.title,
                newDescription: doc.description,
                newCategoryid: category.id,
                newRequirements: {
                    create: doc.requirements.map(req => ({
                        title: req,
                        description: req,
                    }))
                }
            }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
<script setup lang="ts">
const data = {
  hero: {
    "size": "max",
    "ab_testing": null,
    "uppercase": false,
    "transitiontime": null,
    "overlay": "partial",
    "soundonscroll": false,
    "cards": [
      {
        "id": 128,
        "title": "PREMIER ELEGANCE ACROSS THE GLOBE ",
        "description": null,
        "timerText": null,
        "timerDateTime": null,
        "startDate": null,
        "endDate": null,
        "btnExternal": null,
        "timecard": null,
        "idcard": null,
        "media": {
          "id": 728,
          "name": "the-palace-ompany.mp4",
          "url": "https://www.thepalacecompany.com/the_palace_ompany_b0de6c1efa.mp4",
          "caption": null,
          "alternativeText": null,
          "imageformats": null,
          "mime": "video/mp4",
          "isUrlSigned": false
        },
        "mediam": null,
        "btninternal": null,
        "btnmodal": null
      }
    ],
    "countries": null
  },
  contentIntro: {
    "title": "What We Do",
    "description": "We create journeys. Not transactions.\n\nAs a tour operator, PR Global goes beyond reservations to build immersive, end-to-end travel packages with unmatched coordination and personalization.",
    "decorativeLine": true,
    "tagH": "h2",
    "btnltext": null,
    "btnlexternal": null,
    "btnrtext": null,
    "btnrexternal": null,
    "removepaddingbottom": false,
    "ab_testing": null,
    "timerdatetime": null,
    "timertext": null,
    "themetimer": "default",
    "sizetimer": "small",
    "bgcolor": true,
    "uppercase": false,
    "countries": null,
    "btnlinternal": null,
    "btnrinternal": null,
    "btnlmodal": null,
    "btnrmodal": null
  },
  contentForm: {
    "title": "How Can We Help You?",
    "region": "na1",
    "formId": "1ae6e7a1-be65-4b65-b36a-59ee55dfd333",
    "portalId": "2284186",
    "countries": {},
    "media": {
      "id": 1774,
      "name": "customer-service-moon-palace-jamaica.webp",
      "url": "https://jamaica.moonpalace.com/customer_service_moon_palace_jamaica_faba3851c3.webp",
      "caption": null,
      "alternativeText": "customer service staff in the lobby",
      "imageformats": {
        "large": {
          "url": "https://jamaica.moonpalace.com/large_customer_service_moon_palace_jamaica_faba3851c3.webp"
        },
        "small": {
          "url": "https://jamaica.moonpalace.com/small_customer_service_moon_palace_jamaica_faba3851c3.webp"
        },
        "medium": {
          "url": "https://jamaica.moonpalace.com/medium_customer_service_moon_palace_jamaica_faba3851c3.webp"
        },
        "xlarge": {
          "url": "https://jamaica.moonpalace.com/xlarge_customer_service_moon_palace_jamaica_faba3851c3.webp"
        },
        "xsmall": {
          "url": "https://jamaica.moonpalace.com/xsmall_customer_service_moon_palace_jamaica_faba3851c3.webp"
        },
        "xxlarge": {
          "url": "https://jamaica.moonpalace.com/xxlarge_customer_service_moon_palace_jamaica_faba3851c3.webp"
        },
        "thumbnail": {
          "url": "https://jamaica.moonpalace.com/thumbnail_customer_service_moon_palace_jamaica_faba3851c3.webp"
        }
      },
      "mime": "image/webp",
      "isUrlSigned": false
    }
  },
  contentInfo: {
    "title": "Other Ways to Get in Touch",
    "bgColor": true,
    "decorativeLine": true,
    "countries": null,
    "infoText": [
      {
        "id": 119,
        "title": "Members",
        "description": "<a href=\"mailto:memberservices@palaceelite.com.mx\">memberservices@palaceelite.com.mx</a>"
      },
      {
        "id": 120,
        "title": "Tour Reservations",
        "description": "<a href=\"mailto:toursinfo@thepalacecompany.com\">toursinfo@thepalacecompany.com</a>"
      },
      {
        "id": 121,
        "title": "Weddings",
        "description": "<a href=\"mailto:weddings@thepalacecompany.com\">weddings@thepalacecompany.com</a>"
      },
      {
        "id": 122,
        "title": "Transportation",
        "description": "<a href=\"mailto:toursandtransfersjamaica@thepalacecompany.com\">toursandtransfersjamaica@thepalacecompany.com</a>"
      },
      {
        "id": 123,
        "title": "Interval Members",
        "description": "Prepay All-Inclusive fees & general inquiries\n1-305-925-3094\n\nMexico, Central and South America\nMéxico 5556277300\n+1-305 925 3094\n<a href=\"mailto:palaceresorts@clubreservations.com\">palaceresorts@clubreservations.com</a>"
      },
      {
        "id": 124,
        "title": "Other Requests",
        "description": "<a href=\"mailto:info@thepalacecompany.com\">info@thepalacecompany.com</a>"
      },
      {
        "id": 125,
        "title": "Meetings and Incentives",
        "description": "For professional and business-related events\n\n<a href=\"mailto:leads@thepalacecompany.com\">leads@thepalacecompany.com</a>"
      },
      {
        "id": 126,
        "title": "Social Groups",
        "description": "Group travel for leisure and pleasure\n\n<a href=\"mailto:socialgroups@thepalacecompany.com\">socialgroups@thepalacecompany.com</a>"
      },
      {
        "id": 127,
        "title": "Job Inquiries",
        "description": "<a href=\"mailto:atracciondetalento@palaceresorts.com\">atracciondetalento@palaceresorts.com</a>"
      }
    ]
  }
}
</script>

<template>
  <div>
    <hero v-bind="data.hero" />
    <content-intro v-bind="data.contentIntro" />
    <content-form v-bind="data.contentForm" />
    <content-info v-bind="data.contentInfo" />
  </div>
</template>

<script setup lang="ts">
const data = {
  hero: {
    "size": "min",
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
  wysiwyg: {
    "wysiwyg": "<h1 style=\"margin-left:0px;\">O Facials</h1><p style=\"margin-left:0px;\">Our collection of facials is designed to address the different needs of the skin: hydration, firmness and total wellbeing</p><p style=\"margin-left:0px;\"><strong>Essential Shock Intense (80 min)</strong><br>Regenerates and repairs the skin down to the deepest layers, preventing premature aging. The result: renewed, glowing skin, full of vitality.</p><p style=\"margin-left:0px;\"><strong>Balancing (80 min)</strong><br>Deep cleansing facial to extract impurities and give you a glow. The result: detoxified, clear-looking skin.</p><p style=\"margin-left:0px;\"><strong>Vitamin C (80 min)</strong><br>100% antioxidant treatment that softens the skin texture on your face and hands. The result: glowing, revitalized skin.</p><p style=\"margin-left:0px;\"><strong>Refreshing (50 min)</strong><br>Facial treatment for all skin types, ideal for frequent travelers. The result: oxygenated, hydrated skin.</p><p style=\"margin-left:0px;\"><strong>Ceutical (50 min)</strong><br>Facial treatment for sensitive or reactive skin, which has a desensitizing, calming effect, helping to protect skin from external aggressions, and is free from parabens.</p><p style=\"margin-left:0px;\"><strong>Instant Glow (50 min)</strong><br>Facial and foot treatment. Facial shock effect which reduces expression lines, signs of fatigue and is complemented by a relaxing foot and leg massage.</p><p style=\"margin-left:0px;\"><i>Treatments may vary.</i></p>"
  },
  wysiwyg2: {
    "wysiwyg": "<h1 style=\"margin-left:0px;\">O Massages</h1><p style=\"margin-left:0px;\">Pamper your body and your mind with the benefits of our massages.</p><p style=\"margin-left:0px;\"><strong>Deep Tissue (80 min )</strong><br>Deep-pressure massage that releases muscle knots and alleviates chronic muscle pain or tension.</p><p style=\"margin-left:0px;\"><strong>Back Deep Tissue (50 min)</strong><br>Recommended to mitigate the accumulation of stress and knots in the back through deep pressure.</p><p style=\"margin-left:0px;\"><strong>Aromatherapeutic (80 min)</strong><br>Massage which combines different techniques to improve circulation, elasticity, and well-being, with a choice of two scents.</p><p style=\"margin-left:0px;\"><strong>Holistic (50 min)</strong><br>Let yourself go with this gentle, relaxing full-body Swedish massage.</p><p style=\"margin-left:0px;\"><strong>Citrus (50 min)</strong><br>Experience a massage with a combination of citrus essential oils to help you feel energized and balanced.</p><p style=\"margin-left:0px;\"><strong>Sacred Hot Stone Massage (80 min)</strong><br>A deep, nurturing massage with warm river stones to relieve muscle tension.</p><p style=\"margin-left:0px;\"><i>Treatments may vary.</i></p>"
  },
  wysiwyg3: {
    "wysiwyg": "<h1 style =\"margin-left:0px;\">Golden O Suite</h1><p style=\"margin-left:0px;\">Our most exclusive collection of treatments just for couples. Each experience includes sparkling wine, premium amenities, and hydrotherapy journey.</p><p style=\"margin-left:0px;\"><strong>Romantic (50 min)</strong><br>A relaxing couples massage, a perfect experience for unwinding together.</p><p style=\"margin-left:0px;\"><strong>Anti-Stress (80 min)</strong><br>Soothing and restorative aromatherapeutic massage for two.</p><p style=\"margin-left:0px;\"><strong>Passion</strong><br>A decadent, multi-treatment experience for couples, including:<br>Chocolate Wrap (80 min)<br>Aromatherapeutic Massage (80 min)<br>Refreshing Facial (25 min).</p><p style=\"margin-left:0px;\"><i>Treatments may vary.</i></p>"
  }
}
</script>

<template>
  <div>
    <hero v-bind="data.hero" />
    <wysiwyg v-bind="data.wysiwyg" />
    <wysiwyg v-bind="data.wysiwyg2" />
    <wysiwyg v-bind="data.wysiwyg3" />
  </div>
</template>

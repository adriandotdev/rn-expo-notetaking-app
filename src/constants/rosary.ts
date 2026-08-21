export type RosaryMysterySetId =
	| "joyful"
	| "sorrowful"
	| "glorious"
	| "luminous";

export type RosaryBeadLocation =
	| "crucifix"
	| "intro-large"
	| "intro-small"
	| "centerpiece"
	| "decade-large"
	| "decade-small"
	| "closing";

export type RosaryMysterySet = {
	id: RosaryMysterySetId;
	name: string;
	description: string;
	mysteries: readonly string[];
};

export type RosaryGuideStep = {
	id: string;
	prayerName: string;
	text: string;
	beadLocation: RosaryBeadLocation;
	beadLabel: string;
	beadCount?: number;
	decade?: number;
	mystery?: string;
};

const PRAYERS = {
	signOfCross:
		"In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
	apostlesCreed:
		"I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
	ourFather:
		"Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
	hailMary:
		"Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
	gloryBe:
		"Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.",
	fatima:
		"O my Jesus, forgive us our sins, save us from the fires of hell; lead all souls to heaven, especially those in most need of thy mercy. Amen.",
	hailHolyQueen:
		"Hail, holy Queen, mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us; and after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.",
	closingPrayer:
		"O God, whose only-begotten Son, by his life, death and resurrection, has purchased for us the rewards of eternal life, grant, we beseech thee, that meditating upon these mysteries in the Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.",
} as const;

export const ROSARY_MYSTERY_SETS: readonly RosaryMysterySet[] = [
	{
		id: "joyful",
		name: "Joyful Mysteries",
		description: "The joyful events surrounding Christ's coming.",
		mysteries: [
			"The Annunciation",
			"The Visitation",
			"The Nativity",
			"The Presentation in the Temple",
			"The Finding in the Temple",
		],
	},
	{
		id: "sorrowful",
		name: "Sorrowful Mysteries",
		description: "Christ's suffering and sacrifice for us.",
		mysteries: [
			"The Agony in the Garden",
			"The Scourging at the Pillar",
			"The Crowning with Thorns",
			"The Carrying of the Cross",
			"The Crucifixion",
		],
	},
	{
		id: "glorious",
		name: "Glorious Mysteries",
		description: "The risen Christ and Mary's glory.",
		mysteries: [
			"The Resurrection",
			"The Ascension",
			"The Descent of the Holy Spirit",
			"The Assumption of Mary",
			"The Coronation of Mary",
		],
	},
	{
		id: "luminous",
		name: "Luminous Mysteries",
		description: "Christ's public ministry and revelation.",
		mysteries: [
			"The Baptism of Jesus in the Jordan",
			"The Wedding Feast at Cana",
			"The Proclamation of the Kingdom of God",
			"The Transfiguration",
			"The Institution of the Eucharist",
		],
	},
] as const;

export function getRosarySteps(
	mysterySet: RosaryMysterySet,
): RosaryGuideStep[] {
	const steps: RosaryGuideStep[] = [
		{
			id: "sign-of-cross",
			prayerName: "Sign of the Cross",
			text: PRAYERS.signOfCross,
			beadLocation: "crucifix",
			beadLabel: "Hold the crucifix",
		},
		{
			id: "apostles-creed",
			prayerName: "Apostles' Creed",
			text: PRAYERS.apostlesCreed,
			beadLocation: "crucifix",
			beadLabel: "On the crucifix",
		},
		{
			id: "opening-our-father",
			prayerName: "Our Father",
			text: PRAYERS.ourFather,
			beadLocation: "intro-large",
			beadLabel: "First large bead",
		},
		{
			id: "opening-hail-marys",
			prayerName: "Three Hail Marys",
			text: PRAYERS.hailMary,
			beadLocation: "intro-small",
			beadLabel: "The three small introductory beads",
			beadCount: 3,
		},
		{
			id: "opening-glory-be",
			prayerName: "Glory Be",
			text: PRAYERS.gloryBe,
			beadLocation: "centerpiece",
			beadLabel: "At the centerpiece",
		},
	];

	mysterySet.mysteries.forEach((mystery, index) => {
		const decade = index + 1;
		steps.push(
			{
				id: `decade-${decade}-mystery`,
				prayerName: `The ${mystery}`,
				text: "Take a moment to reflect on this mystery before beginning the decade.",
				beadLocation: "centerpiece",
				beadLabel: `At the start of decade ${decade}`,
				decade,
				mystery,
			},
			{
				id: `decade-${decade}-our-father`,
				prayerName: "Our Father",
				text: PRAYERS.ourFather,
				beadLocation: "decade-large",
				beadLabel: `Large bead before decade ${decade}`,
				decade,
				mystery,
			},
			{
				id: `decade-${decade}-hail-marys`,
				prayerName: "Ten Hail Marys",
				text: PRAYERS.hailMary,
				beadLocation: "decade-small",
				beadLabel: `Ten small beads in decade ${decade}`,
				beadCount: 10,
				decade,
				mystery,
			},
			{
				id: `decade-${decade}-glory-be`,
				prayerName: "Glory Be",
				text: PRAYERS.gloryBe,
				beadLocation: "decade-large",
				beadLabel: `Large bead after decade ${decade}`,
				decade,
				mystery,
			},
			{
				id: `decade-${decade}-fatima`,
				prayerName: "Fatima Prayer",
				text: PRAYERS.fatima,
				beadLocation: "decade-large",
				beadLabel: `After decade ${decade}, before the next large bead`,
				decade,
				mystery,
			},
		);
	});

	return [
		...steps,
		{
			id: "hail-holy-queen",
			prayerName: "Hail, Holy Queen",
			text: PRAYERS.hailHolyQueen,
			beadLocation: "closing",
			beadLabel: "At the centerpiece",
		},
		{
			id: "closing-prayer",
			prayerName: "Closing Prayer",
			text: PRAYERS.closingPrayer,
			beadLocation: "closing",
			beadLabel: "At the centerpiece",
		},
		{
			id: "closing-sign-of-cross",
			prayerName: "Sign of the Cross",
			text: PRAYERS.signOfCross,
			beadLocation: "crucifix",
			beadLabel: "Hold the crucifix",
		},
	];
}

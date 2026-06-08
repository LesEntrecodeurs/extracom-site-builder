import type { FaqItem } from "@/components/ui/page-faq";

export const homeFaq: FaqItem[] = [
	{
		question: "Que propose la maison Bijou dans son catalogue ?",
		answer:
			"Bijou réunit la bijouterie or et argent, l'horlogerie et l'orfèvrerie. Nous présentons bagues, colliers, bracelets, chaînes et garde-temps, chaque pièce étant décrite avec sa référence, son prix et ses caractéristiques. Le catalogue est consultable et filtrable depuis la page Catalogue.",
	},
	{
		question: "Comment le catalogue Bijou est-il tenu à jour ?",
		answer:
			"Bijou alimente son catalogue en direct depuis sa gestion Sage, via l'API Extracom100. Les références, prix et familles affichés reflètent les données de la boutique en temps réel : nous n'avons pas de double saisie, ce qui garantit la cohérence des prix présentés.",
	},
	{
		question: "Peut-on filtrer les pièces par prix ou par famille ?",
		answer:
			"Oui. Depuis le catalogue, vous filtrez par catalogue (or, argent, montres…), par famille de produits et par fourchette de prix, puis vous triez par prix ou par nom. Une barre de recherche permet aussi de retrouver une pièce par sa référence ou sa description.",
	},
	{
		question: "Comment commander une pièce vue sur le site ?",
		answer:
			"Cette démonstration est un catalogue de présentation : depuis chaque fiche produit, le bouton « Demander cette pièce » vous met en relation avec la maison Bijou, qui finalise la commande. Nous indiquons la référence pour accélérer votre demande.",
	},
];

export const aproposFaq: FaqItem[] = [
	{
		question: "Qu'est-ce que la maison Bijou ?",
		answer:
			"Bijou est une boutique de démonstration construite sur la base d'exemple Sage. Elle illustre un site e-commerce de joaillerie connecté à l'API catalogue Extracom100, qui expose en lecture seule les articles, familles et catalogues d'une gestion Sage100.",
	},
	{
		question: "Pourquoi Bijou s'appuie-t-elle sur Extracom100 ?",
		answer:
			"Bijou utilise Extracom100 pour exposer son catalogue Sage sur le web sans ressaisie. L'API fournit articles, prix, familles et arborescence de catalogues ; le site les met en forme. Toute évolution du catalogue dans Sage se reflète sur le site.",
	},
	{
		question: "Les prix affichés par Bijou sont-ils définitifs ?",
		answer:
			"Les prix présentés proviennent directement de la base Sage de démonstration. Dans un contexte réel, Bijou appliquerait les règles de remise et de tarif propres à chaque client ; sur cette démo, les prix catalogue sont affichés tels quels.",
	},
];

export const contactFaq: FaqItem[] = [
	{
		question: "Comment contacter la maison Bijou ?",
		answer:
			"Bijou répond par e-mail et par téléphone, coordonnées indiquées sur cette page. Pour une demande concernant une pièce précise, mentionnez sa référence : elle figure sur chaque fiche produit et nous permet de vous répondre plus vite.",
	},
	{
		question: "Sous quel délai Bijou répond-elle à une demande ?",
		answer:
			"Bijou s'engage à répondre aux demandes sous 24 à 48 heures ouvrées. Les demandes accompagnées d'une référence article et d'un besoin clair (quantité, variante souhaitée) sont traitées en priorité.",
	},
	{
		question: "Peut-on réserver une pièce du catalogue ?",
		answer:
			"Oui, Bijou peut réserver une pièce le temps d'échanger avec vous. Indiquez la référence et la variante (gamme) souhaitée dans votre message ; nous confirmons la disponibilité depuis la gestion Sage avant de bloquer l'article.",
	},
];

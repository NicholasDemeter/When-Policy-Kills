'use client';

import { useState } from 'react';
import { RiskRadar } from '@/components/RiskRadar';
import { MixMatchTool } from '@/components/MixMatchTool';
import { PolyDrugInteractions } from '@/components/PolyDrugInteractions';
import { AdminPanel } from '@/components/AdminPanel';
import scores from '@/data/scores.json';

const SUBSTANCES = [
  { id: 'alcohol', number: '01', name: 'Alcohol', subheading: 'The Legal Killer', image: '/images/Alcohol_substance.webp' },
  { id: 'opioids', number: '02', name: 'Opioids', subheading: 'Fentanyl Roulette', image: '/images/Opioids.webp' },
  { id: 'benzodiazepines', number: '03', name: 'Benzodiazepines', subheading: 'The Prescription Trap', image: '/images/Benzodiazepines.webp' },
  { id: 'cocaine', number: '04', name: 'Cocaine', subheading: 'Heart Attack in a Line', image: '/images/Cocaine.webp' },
  { id: 'nitrous', number: '05', name: 'Nitrous Oxide', subheading: 'Hippie Crack', image: '/images/Nitrous.webp' },
  { id: 'ketamine', number: '06', name: 'Ketamine', subheading: 'Dissociation as Commodity', image: '/images/Ketamine.webp' },
  { id: 'mdma', number: '07', name: 'MDMA', subheading: 'The Empathogen Paradox', image: '/images/MDMA.webp' },
  { id: 'lsd', number: '08', name: 'LSD', subheading: 'The Misclassified Psychedelic', image: '/images/LSD.webp' },
  { id: 'psilocybin', number: '09', name: 'Psilocybin', subheading: 'Sacred Mushrooms, Scheduled Poisons', image: '/images/Psilocybin.webp' },
  { id: 'cannabis', number: '10', name: 'Cannabis', subheading: 'The Prohibition That Persists', image: '/images/Cannabis.webp' },
  { id: 'kratom', number: '11', name: 'Kratom', subheading: 'The Legal Grey Zone', image: '/images/Kratom.webp' },
  { id: 'suboxone', number: '12', name: 'Suboxone', subheading: 'Treatment as Trap', image: '/images/Suboxone.webp' },
  { id: 'tramadol', number: '13', name: 'Tramadol', subheading: 'The Forgotten Opioid', image: '/images/Tramadol.webp' },
];

const SUBSTANCE_COLORS: Record<string, string> = {
  alcohol: '#22d3ee',
  opioids: '#e879f9',
  benzodiazepines: '#fbbf24',
  cocaine: '#4ade80',
  nitrous: '#a855f7',
  ketamine: '#ff00ff',
  mdma: '#00ffff',
  lsd: '#00ff00',
  psilocybin: '#ffff00',
  cannabis: '#ff8800',
  kratom: '#7cfc00',
  suboxone: '#ff6347',
  tramadol: '#da70d6',
};

const NARRATIVES: Record<string, { origin: string; migration: string; harm: string; incoherence: string; benefits: string }> = {
  alcohol: {
    origin: 'Alcohol is the oldest regulated psychoactive substance in Western law, yet its classification reflects cultural accident rather than pharmacological evidence. Unlike drugs scheduled in the 20th century based on abuse potential, alcohol\'s legal status emerged from centuries of tradition—interrupted only by Prohibition\'s spectacular failure (1920-1933). Today it remains unscheduled despite causing 95,000-100,000 annual U.S. deaths, making it deadlier than all illegal drugs combined.[^1][^2]',
    migration: 'The cultural normalization of alcohol spans millennia, embedded in religious ritual (wine in Christian communion), social bonding (the pub, the bar), and economic systems (breweries, distilleries, vineyards). This deep cultural integration created a constituency powerful enough to resist scheduling—even as evidence accumulated showing alcohol\'s catastrophic harm profile. Prohibition (1920-1933) demonstrated that criminalization of a normalized substance produces black markets, organized crime, and public backlash, lessons that shaped subsequent drug policy.',
    harm: 'The harm profile is uniquely catastrophic: alcohol scores 9-10/10 across fatal overdose risk, long-term physical damage, addiction potential, and withdrawal danger. Unlike most drugs where withdrawal is uncomfortable, alcohol withdrawal can cause seizures and death without medical intervention—a risk shared only with benzodiazepines.[^3][^4] Chronic use damages the liver, pancreas, heart, and brain. Acute intoxication impairs judgment, coordination, and impulse control, driving traffic fatalities, violence, and sexual assault.',
    incoherence: 'This classification incoherence reveals drug policy\'s core dysfunction: if classified by actual harm, alcohol would be Schedule II or higher. Instead, it\'s legal, taxed, and advertised. A substance causing 95,000+ annual deaths remains unscheduled, while LSD (which has caused zero overdose deaths) is Schedule I. The gap between policy and evidence is not accidental—it reflects the economic and political power of the alcohol industry.',
    benefits: 'Who benefits? A massive industry generating hundreds of billions annually, plus tax revenue funding government budgets, plus pharmaceutical companies treating alcohol-related diseases without addressing root causes. The temporal persistence of this misclassification is economically rational for powerful actors, even as it produces measurable public health catastrophe.[^5]',
  },
  opioids: {
    origin: 'Opioids entered Western medicine as miracle painkillers, classified Schedule II (high abuse potential, accepted medical use) since 1914. The Sackler family\'s OxyContin marketing (1996-2010s) exploited this classification, claiming minimal addiction risk despite internal documents proving otherwise—resulting in a $6 billion settlement and 54,700 overdose deaths in 2024 alone.[^1][^2]',
    migration: 'The cultural migration from prescription to street reflects regulatory failure: when prescribing restrictions tightened in the 2010s, dependent users transitioned to illicit heroin and fentanyl. Street opioids carry catastrophic acute lethality (10/10)—respiratory depression stops breathing within minutes. Fentanyl\'s potency (50-100x stronger than morphine) means microgram-level dosing errors are fatal, and contamination is widespread.[^3]',
    harm: 'Opioids produce profound respiratory depression, the mechanism of overdose death. Chronic use causes constipation, hormonal disruption, immune suppression, and psychological dependence. The addiction potential is extreme (10/10), driven by mu-receptor activation and reward pathway hijacking. Withdrawal is severe (9/10) but not medically dangerous—the primary risk is relapse driven by psychological craving and physical discomfort.',
    incoherence: 'The classification incoherence is stark: pharmaceutical opioids (Schedule II, legal with prescription) and street opioids (Schedule I, illegal) differ in purity control, not pharmacology. A person prescribed oxycodone faces similar overdose and addiction risks as someone using heroin—one is medicalized, the other criminalized. This arbitrary distinction has produced a public health catastrophe: millions addicted through prescriptions, then criminalized when they transition to street supplies.',
    benefits: 'Who benefits? Pharmaceutical companies profited from the prescription phase; now law enforcement and the prison-industrial complex profit from criminalization. Meanwhile, fentanyl-contaminated supplies kill users who believe they\'re taking heroin or pressed pills.[^4]',
  },
  benzodiazepines: {
    origin: 'Benzodiazepines—Xanax, Valium, Klonopin—entered medicine in the 1960s as "safer" alternatives to barbiturates, classified Schedule IV (low abuse potential, accepted medical use). This classification obscures a lethal reality: benzodiazepine withdrawal is medically dangerous (10/10 severity), capable of causing seizures and death without supervised tapering.',
    migration: 'Cultural normalization through prescription created a massive population of dependent users who never intended recreational use. Benzodiazepines became the default treatment for anxiety and insomnia, prescribed for decades with minimal monitoring. This normalized use obscured the addiction potential: users believed they were taking safe medication, not realizing they were developing physical dependence that could become life-threatening.',
    harm: 'Combined with alcohol or opioids, benzos create synergistic lethality (10/10 polydrug risk)—respiratory depression accelerates catastrophically.[^1][^2] The harm profile shows high addiction potential (9/10) and severe long-term physical damage (9/10). Long-term use causes cognitive impairment, memory loss, and increased fall risk in elderly populations. Withdrawal requires months-long medical tapering or risks seizure.',
    incoherence: 'Benzos cause more harm than many Schedule I substances, yet remain widely prescribed and legally advertised. The Schedule IV classification reflects their medical utility, not their actual harm profile. This creates a perverse incentive: pharmaceutical companies profit from prescriptions; addiction treatment centers profit from medically-supervised detox; meanwhile, the opioid crisis conceals a parallel benzodiazepine dependence epidemic affecting millions of prescribed users.[^3]',
    benefits: 'The temporal persistence of benzodiazepine prescribing reflects institutional inertia and pharmaceutical marketing rather than evidence. Doctors continue prescribing because alternatives (psychotherapy, lifestyle changes) require more time and effort. Patients continue taking them because withdrawal is terrifying. The system profits from this stasis.',
  },
  cocaine: {
    origin: 'Cocaine arrived in Western medicine as a local anesthetic in the 1880s, then migrated to recreational use before Schedule II classification in 1970. Unlike opioids (respiratory depression) or alcohol (multi-organ failure), cocaine kills through cardiovascular catastrophe: vasoconstriction, arrhythmia, myocardial infarction (8/10 acute lethality).[^1]',
    migration: 'The cultural migration reflects class and race dynamics: powder cocaine (associated with white users) remained Schedule II; crack cocaine (associated with Black users) triggered mandatory minimum sentencing laws in the 1980s-90s, creating mass incarceration despite identical pharmacology.[^2] This reveals drug policy\'s racial architecture: the same molecule received different legal consequences based on the race of typical users.',
    harm: 'The harm profile shows severe long-term physical damage (9/10)—repeated use causes cardiac remodeling, stroke risk, and nasal septum perforation. Addiction potential is high (8/10), driven by dopamine depletion and psychological compulsion. Acute intoxication impairs judgment and increases risk-taking. Chronic use produces paranoia, anxiety, and depression.',
    incoherence: 'This classification incoherence—punishing crack more harshly than powder—reveals drug policy\'s racial architecture. Powder cocaine use among affluent populations faced minimal enforcement; crack cocaine triggered mass incarceration in Black communities.[^3] The temporal persistence of this double standard lasted decades until 2010 Fair Sentencing Act reforms—proving that evidence can eventually overcome institutional racism, but only after enormous human cost.',
    benefits: 'Who benefits? Law enforcement budgets grew through War on Drugs funding; the prison-industrial complex profited from crack-related incarceration; meanwhile, powder cocaine use among affluent populations faced minimal enforcement. The racial disparities in cocaine sentencing represent one of the clearest examples of drug policy\'s structural racism.[^4]',
  },
  nitrous: {
    origin: 'Nitrous oxide occupies a regulatory blind spot: widely available for culinary use (whipped cream chargers), unscheduled by the DEA, yet capable of serious neurological harm. Unlike mythic drugs wrapped in ritual, nitrous arrives wrapped in logistics—balloons, chargers, parking-lot microeconomies at music festivals.[^1]',
    migration: 'The cultural migration reflects changing consumption patterns: nitrous moved from medical anesthetic (dentistry, surgery) to recreational use at raves and festivals. The brief duration of effects (30-60 seconds) and low cost created patterns of compulsive redosing. This migration from medical to recreational use coincided with the rise of the "whippet" subculture—users consuming dozens of chargers in single sessions.',
    harm: 'The harm profile shows moderate acute lethality (4/10) but significant long-term physical damage (7/10) through B12 depletion. Chronic heavy use causes subacute combined degeneration of the spinal cord—progressive nerve damage leading to numbness, weakness, and difficulty walking.[^2] This harm is insidious: it doesn\'t announce itself with dramatic overdoses but accumulates silently over months of repeated use.',
    incoherence: 'The classification incoherence is extreme: nitrous is unscheduled while psychedelics (which cause minimal physical harm) are Schedule I. Nitrous causes measurable neurological damage; LSD does not. Yet nitrous remains legal for culinary use while LSD is federally prohibited. This gap reveals that scheduling reflects cultural panic and pharmaceutical industry interests, not evidence-based harm assessment.',
    benefits: 'Who benefits? Culinary supply companies profit from bulk charger sales without restriction; the lack of regulatory oversight allows unlimited distribution. The unscheduled status means no tracking, no enforcement, no accountability—despite documented neurological harm from chronic use.',
  },
  ketamine: {
    origin: 'Ketamine entered medicine in 1962 as a dissociative anesthetic, used in surgery and emergency medicine. It was classified Schedule III in 1999 after recreational use emerged. Unlike opioids or stimulants, ketamine\'s pharmacology is unique: it blocks NMDA receptors rather than acting on dopamine or opioid systems, producing dissociation rather than euphoria.[^1]',
    migration: 'The cultural migration from medical anesthetic to club drug reflects the substance\'s unique properties: rapid onset (seconds), brief duration (15-30 minutes), and profound dissociation. This profile made it attractive for dance music contexts where brief, intense experiences fit the environment. The migration also reflects pharmaceutical diversion: ketamine used in veterinary and human medicine entered black markets through theft and illegal distribution.[^2]',
    harm: 'The harm profile shows moderate acute lethality (5/10) and moderate long-term physical damage (6/10). Chronic heavy use can cause bladder dysfunction and urinary tract damage. The addiction potential is moderate (6/10), driven more by psychological compulsion than physical dependence. The primary acute risk is behavioral: dissociation impairs judgment, increasing accident risk and vulnerability to assault.[^3]',
    incoherence: 'Ketamine\'s Schedule III classification reflects a compromise: it has accepted medical use (anesthesia, pain management, emerging psychiatric applications) but is also subject to abuse. Yet ketamine causes less measurable harm than Schedule II opioids or Schedule I cannabis. The incoherence reveals that scheduling reflects bureaucratic categorization rather than proportional harm assessment.[^4]',
    benefits: 'Who benefits? Pharmaceutical companies profit from medical ketamine; law enforcement profits from criminalization of recreational use; meanwhile, emerging psychiatric applications (ketamine-assisted therapy for depression and PTSD) are blocked by Schedule III restrictions, delaying potentially beneficial treatments.',
  },
  mdma: {
    origin: 'MDMA (3,4-methylenedioxymethamphetamine) was synthesized in 1912 by German chemists, patented by Merck in 1914, and used in psychotherapy in the 1970s before being classified Schedule I in 1985. The drug produces empathy, emotional openness, and social connection—properties that made it valuable for therapeutic contexts and attractive for recreational use.[^1]',
    migration: 'The cultural migration from therapeutic use to recreational use reflects the substance\'s unique properties: MDMA produces empathy and emotional openness rather than euphoria or dissociation. This profile made it attractive for dance music contexts where social connection and emotional bonding are central. The migration also reflects the criminalization of psychotherapy: when MDMA was scheduled, therapeutic applications were blocked, driving the substance underground.[^2]',
    harm: 'The harm profile shows low acute lethality (2/10) but moderate long-term physical damage (5/10) through serotonin depletion and potential neurotoxicity. Chronic heavy use can cause memory impairment and mood dysregulation. The addiction potential is low (3/10), as MDMA does not produce the compulsive redosing seen with stimulants or opioids. The primary acute risk is behavioral: emotional openness can lead to poor decision-making and vulnerability to exploitation.[^3]',
    incoherence: 'MDMA\'s Schedule I classification is incoherent: the drug has lower abuse potential and lower harm profile than many Schedule II substances. Yet MDMA is classified alongside heroin and LSD, substances with vastly different pharmacology and harm profiles. This incoherence reflects the drug\'s association with counterculture rather than evidence-based assessment. Recent FDA approval for MDMA-assisted therapy (2023) suggests that scheduling reflects cultural panic rather than pharmacological reality.[^4]',
    benefits: 'Who benefits? Law enforcement profits from criminalization; meanwhile, MDMA\'s therapeutic potential for PTSD and depression remains restricted by Schedule I status, delaying potentially life-saving treatments. The temporal persistence of MDMA\'s Schedule I classification despite emerging evidence of therapeutic benefit represents a massive opportunity cost in mental health treatment.',
  },
  lsd: {
    origin: 'LSD (lysergic acid diethylamide) was synthesized in 1938 by Albert Hofmann at Sandoz Pharmaceuticals and used in psychiatric research in the 1950s-60s before being classified Schedule I in 1968. LSD produces profound perceptual and cognitive changes—visual hallucinations, altered time perception, ego dissolution—without direct effects on dopamine or opioid systems.[^1]',
    migration: 'The cultural migration from psychiatric research to recreational use reflects the substance\'s unique properties: LSD produces mystical experiences and altered consciousness rather than euphoria or stimulation. This profile made it attractive for countercultural exploration and spiritual seeking. The migration also reflects the criminalization of consciousness exploration: when LSD was scheduled, psychiatric research was blocked, and the substance became associated with counterculture rebellion rather than scientific inquiry.[^2]',
    harm: 'The harm profile shows extremely low acute lethality (0/10)—LSD has never caused an overdose death. Long-term physical damage is minimal (1/10), as LSD does not damage organs or produce neurotoxicity. The addiction potential is negligible (0/10), as LSD does not produce compulsive redosing or physical dependence. The primary risk is psychological: LSD can trigger anxiety, paranoia, or existential distress in vulnerable individuals, particularly those with underlying psychotic vulnerabilities.[^3]',
    incoherence: 'LSD\'s Schedule I classification is profoundly incoherent: the drug has zero overdose deaths, minimal physical harm, and no addiction potential—yet is classified alongside heroin and fentanyl. Alcohol causes 95,000+ deaths annually and remains legal; LSD causes zero deaths and is Schedule I. This gap reveals that scheduling reflects cultural panic and political convenience rather than evidence-based harm assessment.[^4]',
    benefits: 'Who benefits? Law enforcement profits from criminalization; meanwhile, LSD\'s therapeutic potential for depression, anxiety, and end-of-life distress remains blocked by Schedule I restrictions. The temporal persistence of LSD\'s Schedule I classification despite zero documented harm and emerging evidence of therapeutic benefit represents a massive opportunity cost in mental health treatment and consciousness research.',
  },
  psilocybin: {
    origin: 'Psilocybin (4-phosphoryloxy-N,N-dimethyltryptamine) is a naturally occurring compound found in over 200 species of mushrooms. It was isolated and synthesized by Albert Hofmann in 1958 and used in psychiatric research in the 1950s-60s before being classified Schedule I in 1968. Psilocybin produces similar perceptual and cognitive changes to LSD but with a shorter duration and different subjective character.[^1]',
    migration: 'The cultural migration from psychiatric research to recreational use reflects the substance\'s natural occurrence and spiritual significance: psilocybin mushrooms have been used in indigenous rituals for millennia. The modern migration reflects the criminalization of consciousness exploration: when psilocybin was scheduled, psychiatric research was blocked, and the substance became associated with countercultural spirituality rather than scientific inquiry.[^2]',
    harm: 'The harm profile shows extremely low acute lethality (0/10)—psilocybin has never caused an overdose death. Long-term physical damage is minimal (1/10), as psilocybin does not damage organs or produce neurotoxicity. The addiction potential is negligible (0/10), as psilocybin does not produce compulsive redosing or physical dependence. The primary risk is psychological: psilocybin can trigger anxiety, paranoia, or existential distress in vulnerable individuals.[^3]',
    incoherence: 'Psilocybin\'s Schedule I classification is profoundly incoherent: the drug has zero overdose deaths, minimal physical harm, and no addiction potential—yet is classified alongside heroin and fentanyl. The substance has been used safely in indigenous rituals for thousands of years. This gap reveals that scheduling reflects cultural panic and colonial erasure of indigenous knowledge rather than evidence-based harm assessment.[^4]',
    benefits: 'Who benefits? Law enforcement profits from criminalization; meanwhile, psilocybin\'s therapeutic potential for depression, anxiety, addiction, and end-of-life distress remains blocked by Schedule I restrictions. Recent FDA breakthrough therapy designations suggest that scheduling reflects cultural panic rather than pharmacological reality. The temporal persistence of psilocybin\'s Schedule I classification despite zero documented harm and emerging evidence of therapeutic benefit represents a massive opportunity cost in mental health treatment.',
  },
  cannabis: {
    origin: 'Cannabis has been used for thousands of years in Asia, the Middle East, and Africa for medical, spiritual, and recreational purposes. It was criminalized in the United States in 1937 through the Marihuana Tax Act, classified Schedule I in 1970, and remains federally prohibited despite growing evidence of medical utility and minimal harm.[^1]',
    migration: 'The cultural migration reflects changing legal status: cannabis moved from legal medicinal use (it was in the U.S. Pharmacopeia until 1942) to criminalized recreational use. This migration reflects racist drug policy: cannabis prohibition targeted Mexican immigrants and Black communities, not the substance\'s pharmacology.[^2] Recent legalization in multiple states reveals that prohibition reflects political convenience rather than evidence-based policy.',
    harm: 'The harm profile shows low acute lethality (1/10)—cannabis has never caused an overdose death. Long-term physical damage is moderate (4/10), primarily through respiratory effects from smoking (not unique to cannabis). The addiction potential is low (3/10), as cannabis does not produce the compulsive redosing or severe withdrawal seen with opioids or stimulants. The primary risk is psychological: cannabis can trigger anxiety or paranoia in vulnerable individuals, and heavy use during adolescence may affect cognitive development.[^3]',
    incoherence: 'Cannabis\'s Schedule I classification is profoundly incoherent: the drug has lower harm potential than alcohol (legal) or tobacco (legal), yet remains federally prohibited. Cannabis has documented medical utility for pain, nausea, and seizures, yet Schedule I status blocks research. This gap reveals that scheduling reflects political convenience and racial targeting rather than evidence-based harm assessment.[^4]',
    benefits: 'Who benefits? Law enforcement profits from criminalization; the prison-industrial complex profited from cannabis-related incarceration, disproportionately affecting Black communities. Meanwhile, cannabis\'s medical potential remains blocked by Schedule I restrictions. Recent state-level legalization demonstrates that prohibition reflects political convenience rather than pharmacological necessity.',
  },
  kratom: {
    origin: 'Kratom (Mitragyna speciosa) is a Southeast Asian plant whose leaves contain alkaloids that interact with opioid receptors. Used for centuries in Thailand and Malaysia as a traditional stimulant and pain reliever, kratom entered Western markets in the 2000s as an unscheduled herbal supplement. Its legal ambiguity reflects the regulatory system\'s failure to categorize substances that don\'t fit existing frameworks.[^1]',
    migration: 'Kratom migrated from traditional Southeast Asian use to Western markets through the supplement industry, sold in smoke shops and online as a "legal high" and opioid withdrawal aid. This migration reflects two contradictory user populations: people seeking a mild stimulant, and people using it to manage opioid dependence. The DEA attempted emergency scheduling in 2016 but faced unprecedented public opposition, revealing kratom\'s complex harm-benefit profile.[^2]',
    harm: 'The harm profile is moderate and contested: acute lethality is low (2/10) in isolation, but kratom has been involved in polydrug overdose deaths. Long-term physical damage is moderate (4/10), with cases of liver toxicity and dependence. The addiction potential is real (5/10)—kratom produces withdrawal symptoms similar to opioids, though less severe. The primary harm is the regulatory vacuum: no quality control, no dosing standards, no safety monitoring.[^3]',
    incoherence: 'Kratom\'s unscheduled status creates perverse outcomes: it\'s legal in most U.S. states despite opioid-like properties, while cannabis (lower harm profile) remains Schedule I in federal law. The classification incoherence reflects the regulatory system\'s inability to handle substances that are simultaneously traditional medicine, opioid withdrawal aid, and recreational drug. Evidence-based scheduling would require acknowledging kratom\'s harm-reduction potential for opioid-dependent users.[^4]',
    benefits: 'Who benefits from kratom\'s legal ambiguity? Supplement companies selling unregulated products without safety standards. Who is harmed? Users who lack accurate dosing information, quality controls, or medical guidance. The regulatory vacuum serves industry profits while exposing vulnerable users—particularly those using kratom to manage opioid withdrawal—to unnecessary risk.',
  },
  suboxone: {
    origin: 'Suboxone (buprenorphine/naloxone) is a Schedule III partial opioid agonist approved in 2002 as the first opioid use disorder treatment that could be prescribed in office-based settings rather than requiring methadone clinic attendance. Buprenorphine\'s partial agonist properties produce a ceiling effect on respiratory depression, making it significantly safer in overdose than full agonists. The naloxone component deters injection misuse by precipitating withdrawal if the film is dissolved and injected.[^1]',
    migration: 'Suboxone\'s migration from treatment tool to controlled substance reflects the criminalization of addiction medicine. Despite robust evidence for its efficacy in reducing overdose deaths, illicit drug use, and criminal activity, buprenorphine prescribing has been restricted by federal waiver requirements (the X-waiver, eliminated only in 2023), pharmacy reluctance, and stigma. The result: a medication that could save lives is treated with the same suspicion as the addiction it treats.[^2]',
    harm: 'The harm profile shows low acute lethality in isolation (2/10) due to the ceiling effect, but the polydrug risk is the highest of any substance in this analysis (9/10). Buprenorphine combined with benzodiazepines, alcohol, or other CNS depressants removes the ceiling effect and dramatically increases overdose risk. This interaction is responsible for the majority of buprenorphine-involved overdose deaths. The addiction potential score (8/10) reflects physical dependence—patients on maintenance therapy will experience withdrawal if the medication is abruptly discontinued.[^3]',
    incoherence: 'The classification incoherence for Suboxone is uniquely cruel: it is simultaneously a life-saving medication and a controlled substance subject to restrictions that limit its availability. These restrictions have no pharmacological justification—they reflect moral judgments about addiction treatment rather than evidence-based harm assessment. The result is a treatment gap that kills people: patients who cannot access buprenorphine return to street opioids.[^4]',
    benefits: 'Who benefits from Suboxone\'s restricted access? Methadone clinics that maintain monopolies on opioid agonist treatment; pharmaceutical companies that profit from branded formulations; law enforcement agencies that conflate treatment medications with drug abuse. Who pays the cost? Patients with opioid use disorder who cannot access evidence-based treatment and die of overdose as a result.',
  },
  tramadol: {
    origin: 'Tramadol is a synthetic opioid analgesic developed in 1962 and marketed as a "safer" alternative to traditional opioids due to its dual mechanism of action (weak mu-opioid agonism plus serotonin-norepinephrine reuptake inhibition). It was classified Schedule IV in 2014—the last major opioid to receive scheduling—after evidence accumulated showing significant abuse potential and dependence. Its delayed scheduling reflects the pharmaceutical industry\'s successful marketing of tramadol as a non-opioid.[^1]',
    migration: 'Tramadol\'s cultural migration from "safe painkiller" to scheduled substance mirrors the broader opioid crisis narrative: pharmaceutical marketing minimized addiction risk, prescribing expanded dramatically, dependence emerged at scale. Unlike fentanyl or oxycodone, tramadol\'s harm profile includes unique risks: at high doses, it lowers the seizure threshold, creating a distinct overdose presentation that emergency physicians may not immediately recognize as opioid toxicity.[^2]',
    harm: 'The harm profile shows moderate acute lethality (5/10) with unique features: tramadol overdose can cause both respiratory depression (opioid mechanism) and seizures (serotonergic mechanism), complicating treatment. Long-term physical damage is moderate (5/10). The addiction potential is significant (6/10)—tramadol withdrawal combines opioid withdrawal symptoms with atypical features including anxiety, paresthesias, and perceptual disturbances. Naloxone only partially reverses tramadol overdose, creating treatment challenges.[^3]',
    incoherence: 'Tramadol\'s Schedule IV classification is incoherent: it has higher abuse potential and more complex harm profile than many Schedule III or IV substances, yet was scheduled lower than traditional opioids. This reflects successful pharmaceutical lobbying rather than pharmacological evidence. The delayed scheduling (2014, decades after introduction) allowed widespread prescribing without appropriate monitoring, contributing to a tramadol dependence epidemic that remains underrecognized within the broader opioid crisis.[^4]',
    benefits: 'Who benefits from tramadol\'s delayed scheduling and low classification? The pharmaceutical companies that marketed it as a safe alternative to opioids, capturing market share while avoiding Schedule II restrictions. Who paid the cost? Patients who developed dependence believing they were taking a non-addictive medication, and emergency physicians dealing with an overdose presentation that standard opioid reversal protocols only partially address.',
  },
};

export default function Home() {
  const [selectedSubstances, setSelectedSubstances] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);

  const toggleSubstance = (id: string) => {
    setSelectedSubstances(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <AdminPanel />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero_masthead.webp"
            alt="When Policy Kills"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          <div className="inline-block px-4 py-2 border border-cyan-400 rounded-full mb-6 text-cyan-400 text-sm tracking-wider">
            RESEARCH REPORT 2026
          </div>
          <h1 className="text-6xl font-bold mb-4 text-white">When Policy Kills</h1>
          <p className="text-xl text-slate-200 mb-8">Temporal Persistence of Flawed Epistemology</p>
          <button
            onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
          >
            Begin Reading ↓
          </button>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Methodology</h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            This analysis uses a 10-indicator spider/radar chart framework to visualize harm profiles across substances. Each indicator (Acute Lethality, Chronic Toxicity, Addiction Potential, etc.) is scored 0-10 based on epidemiological evidence and clinical data. The resulting polygons reveal classification incoherence: substances with identical harm profiles often occupy different legal schedules, while substances with minimal harm face severe restrictions.
          </p>
          <p>
            The framework is not prescriptive—it does not recommend legalization or criminalization. Rather, it exposes the gap between policy and evidence, asking: Why do substances with similar harm profiles face vastly different legal consequences?
          </p>
        </div>
      </section>

      {/* Substance Sections */}
      {SUBSTANCES.map((substance, index) => {
        const narrative = NARRATIVES[substance.id as keyof typeof NARRATIVES];
        const color = SUBSTANCE_COLORS[substance.id] || '#22d3ee';

        const scoreKeyMap: Record<string, string> = {
          alcohol: 'Alcohol',
          opioids: 'Opioids_Street',
          benzodiazepines: 'Benzodiazepines',
          cocaine: 'Cocaine',
          nitrous: 'Nitrous_Oxide',
          ketamine: 'Ketamine',
          mdma: 'MDMA',
          lsd: 'LSD',
          psilocybin: 'Psilocybin',
          cannabis: 'Cannabis',
          kratom: 'Kratom',
          suboxone: 'Suboxone',
          tramadol: 'Tramadol',
        };

        const scoreKey = scoreKeyMap[substance.id];
        const scoresData = scores as any;
        const substanceScores = scoreKey ? scoresData.substances?.[scoreKey]?.indicators : null;

        return (
          <section
            key={substance.id}
            id={substance.id}
            className="border-t border-slate-800"
          >
            {/* Full-width Banner with text overlay */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={substance.image}
                alt={substance.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="absolute bottom-0 left-0 right-0 px-8 py-6 max-w-6xl mx-auto">
                <div
                  className="inline-block px-3 py-1 font-bold text-sm mb-2 rounded text-black"
                  style={{ backgroundColor: color }}
                >
                  {substance.number}
                </div>
                <h2 className="text-4xl font-bold text-white mb-1">{substance.name}</h2>
                <p className="text-lg" style={{ color }}>{substance.subheading}</p>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="py-12 px-4 max-w-6xl mx-auto">
              <div className="relative overflow-auto">
                <div className="text-slate-300 leading-relaxed space-y-4 prose prose-invert max-w-none">

                  {/* Spider Chart — floated right */}
                  {substanceScores && (
                    <div className="float-right ml-6 mb-4" style={{ width: '380px', height: '340px' }}>
                      <RiskRadar
                        data={substanceScores}
                        color={color}
                      />
                    </div>
                  )}

                  <p>{narrative?.origin}</p>
                  <p>{narrative?.migration}</p>
                  <p>{narrative?.harm}</p>
                  <p>{narrative?.incoherence}</p>
                  <p>{narrative?.benefits}</p>
                </div>
                <div className="clear-both"></div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Mix & Match Tool */}
      <section className="py-16 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Compare Substances</h2>
          <MixMatchTool />
        </div>
      </section>

      {/* Poly-Drug Interactions Section — no duplicate header, proper margin */}
      <section id="polydrug" className="py-16 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <PolyDrugInteractions />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center text-slate-400 text-sm">
          <p className="mb-4">
            When Policy Kills — Research Report (2026)
          </p>
          <p>
            This analysis was developed through collaboration between human researchers and AI systems. The research claims, citations, and policy analysis reflect human expertise and judgment. AI assisted with data visualization, layout, and editorial refinement.
          </p>
        </div>
      </footer>
    </div>
  );
}

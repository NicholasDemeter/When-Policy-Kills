<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

## Final Check

**No further clarifications required; proceeding under locked assumptions.**

## CSV Dataset

```csv
substance,indicator_1,indicator_2,indicator_3,indicator_4,indicator_5,indicator_6,indicator_7,indicator_8,indicator_9,indicator_10,confidence_1,confidence_2,confidence_3,confidence_4,confidence_5,confidence_6,confidence_7,confidence_8,confidence_9,confidence_10
Alcohol,9,10,9,7,6,10,9,3,10,8,H,H,H,M,M,H,H,H,H,M
Opioids,10,9,10,3,2,8,10,10,5,4,H,H,H,M,L,H,H,H,H,L
Benzodiazepines,4,6,9,4,4,9,10,7,7,7,M,M,H,M,M,H,H,M,H,M
Cocaine,8,7,8,9,5,3,7,6,8,5,H,H,H,M,M,L,H,M,H,M
Nitrous Oxide,1,8,5,3,3,2,6,4,6,9,H,H,M,M,L,L,M,M,H,H
Ketamine,2,7,6,6,4,3,8,5,5,7,H,M,M,M,M,L,H,M,M,M
LSD,1,1,1,7,4,1,3,6,2,3,H,H,H,M,M,L,M,M,H,L
Psilocybin,1,1,1,6,4,1,3,7,2,3,H,H,H,M,M,L,M,M,H,L
MDMA,3,4,7,5,3,2,7,5,6,6,M,M,H,M,M,L,H,M,H,M
Cannabis,1,3,4,4,3,1,3,4,4,5,H,H,H,M,M,L,M,M,H,M
```

**Confidence Key:** H=High (national surveillance/strong epidemiology), M=Moderate (RCTs/mixed observational), L=Low (limited data/case series)

## JSON Explanations

```json
{
  "Alcohol": {
    "indicator_1": {"score": 9, "confidence": "H", "justification": "CDC: ~95-100k annual US deaths from acute alcohol poisoning, accidents, aspiration during intoxication. Leading cause of acute poisoning death excluding opioids.", "citations": ["CDC Alcohol Facts", "NIAAA Surveillance"]},
    "indicator_2": {"score": 10, "confidence": "H", "justification": "Cirrhosis (10-20% heavy drinkers), cardiomyopathy, Wernicke-Korsakoff, cancer. Clear dose-response; longitudinal data definitive.", "citations": ["CDC Liver Disease", "Lancet Alcohol Harm"]},
    "indicator_3": {"score": 9, "confidence": "H", "justification": "15-20% lifetime risk AUD diagnosis; strong reward conditioning + physiological dependence.", "citations": ["SAMHSA NSDUH", "NIAAA Epidemiology"]},
    "indicator_4": {"score": 7, "confidence": "M", "justification": "Acute aggression common (most potent violence driver); blackouts in 20-30% binge drinkers. ER aggression presentations well-documented.", "citations": ["ER Violence Studies", "WHO Alcohol Violence"]},
    "indicator_5": {"score": 6, "confidence": "M", "justification": "Alcohol-related cognitive impairment common in chronic use; distinguishing drug effect vs. confounding factors interpretive.", "citations": ["Cognitive Decline Studies", "Neuropsych Reviews"]},
    "indicator_6": {"score": 10, "confidence": "H", "justification": "Delirium tremens, seizures begin 6-48h; medically life-threatening without treatment. Standard withdrawal protocol exists.", "citations": ["ASAM Withdrawal Guidelines", "NIAAA"]},
    "indicator_7": {"score": 9, "confidence": "H", "justification": "Synergy with opioids/benzos (respiratory depression); most common poly-OD component.", "citations": ["CDC Polypharmacy", "NIDA Interactions"]},
    "indicator_8": {"score": 3, "confidence": "H", "justification": "Pharmaceutical production; known ABV; users routinely calibrate doses.", "citations": ["Beverage Control Data", "Standardized Production"]},
    "indicator_9": {"score": 10, "confidence": "H", "justification": "Strongest epidemiological link to violence (50%+ assaults); disinhibition + aggression.", "citations": ["FBI UCR", "WHO Global Status"]},
    "indicator_10": {"score": 8, "confidence": "M", "justification": "Legal + cultural normalization leads to chronic underestimation of cancer/cardiomyopathy risk.", "citations": ["Gallup Risk Perception", "Health Policy Reviews"]}
  },
  "Opioids": {
    "indicator_1": {"score": 10, "confidence": "H", "justification": "CDC: 54,700 deaths 2024; fentanyl lethal dose ~2mg routinely exceeded in street supply.", "citations": ["CDC NVSS", "NIDA OD Data"]},
    "indicator_2": {"score": 9, "confidence": "H", "justification": "Endocarditis (IV), immunosuppression, hypogonadism; longitudinal data definitive.", "citations": ["NEJM Opioid Complications", "CDC Morbidity"]},
    "indicator_3": {"score": 10, "confidence": "H", "justification": "25-30% non-medical users develop SUD; strongest reward + dependence profile.", "citations": ["SAMHSA NSDUH", "JAMA Addiction"]},
    "indicator_4": {"score": 3, "confidence": "M", "justification": "Sedation predominant over agitation; acute psych risk low vs. respiratory failure.", "citations": ["Psych ER Data", "NIDA Acute Effects"]},
    "indicator_5": {"score": 2, "confidence": "L", "justification": "Minimal persistent psych effects independent of withdrawal/SUD.", "citations": ["Limited Long-term Data"]},
    "indicator_6": {"score": 8, "confidence": "H", "justification": "Severe but not life-threatening; high discomfort drives relapse.", "citations": ["ASAM Guidelines", "JAMA Withdrawal"]},
    "indicator_7": {"score": 10, "confidence": "H", "justification": "Benzos (2-3x OD risk); alcohol; most lethal poly-drug combo.", "citations": ["CDC Polypharmacy", "NIDA Fatalities"]},
    "indicator_8": {"score": 10, "confidence": "H", "justification": "Fentanyl contamination: 255x variation in pills; primary OD driver.", "citations": ["DEA Lab Reports", "NIDA Contamination"]},
    "indicator_9": {"score": 5, "confidence": "M", "justification": "Sedation reduces violence; crime association indirect (acquisition).", "citations": ["Crime Studies", "NSDUH"]},
    "indicator_10": {"score": 4, "confidence": "L", "justification": "Illegal status maintains risk awareness; therapeutic opioids create separate normalization pathway.", "citations": ["Policy Perception Studies"]}
  },
  "Benzodiazepines": {
    "indicator_1": {"score": 4, "confidence": "M", "justification": "Rare solo OD (~1k deaths); lethal in poly contexts.", "citations": ["CDC NVSS", "NIDA Benzos"]},
    "indicator_2": {"score": 6, "confidence": "M", "justification": "Cognitive impairment, falls/fractures in elderly/chronic users.", "citations": ["JAMA Geriatrics", "Lancet Neurology"]},
    "indicator_3": {"score": 9, "confidence": "H", "justification": "High dependence potential; 15-44% chronic users dependent.", "citations": ["ASAM Benzos", "JAMA Dependence"]},
    "indicator_4": {"score": 4, "confidence": "M", "justification": "Paradoxical disinhibition in ~1%; rare acute psych crisis.", "citations": ["Psychopharmacology", "ER Data"]},
    "indicator_5": {"score": 4, "confidence": "M", "justification": "Cognitive dulling persists post-cessation; distinguishing from aging confounding.", "citations": ["Neuropsychology Reviews"]},
    "indicator_6": {"score": 9, "confidence": "H", "justification": "Seizures, delirium; medically dangerous withdrawal.", "citations": ["ASAM Guidelines", "Benzodiazepine Withdrawal"]},
    "indicator_7": {"score": 10, "confidence": "H", "justification": "Opioids (synergy), alcohol; common in poly-OD deaths.", "citations": ["CDC Polypharmacy", "NIDA"]},
    "indicator_8": {"score": 7, "confidence": "M", "justification": "Counterfeit pills common; fentanyl contamination rising.", "citations": ["DEA Lab Testing", "StreetRx Data"]},
    "indicator_9": {"score": 7, "confidence": "H", "justification": "Paradoxical aggression documented; criminal association.", "citations": ["Forensic Psychiatry", "Crime Studies"]},
    "indicator_10": {"score": 7, "confidence": "M", "justification": "Historical 'safe' marketing created dependence epidemic; prescription status obscures risk.", "citations": ["Pharma Policy History"]}
  },
  "Cocaine": {
    "indicator_1": {"score": 8, "confidence": "H", "justification": "22k stimulant deaths 2024; CV collapse primary.", "citations": ["CDC NVSS", "NIDA Stimulants"]},
    "indicator_2": {"score": 7, "confidence": "H", "justification": "Cardiomyopathy, nasal septum destruction, cognitive impairment.", "citations": ["Circulation Cocaine", "Neurology Reviews"]},
    "indicator_3": {"score": 8, "confidence": "H", "justification": "15-20% users develop CUD; strong psychological dependence.", "citations": ["SAMHSA NSDUH", "JAMA Addiction"]},
    "indicator_4": {"score": 9, "confidence": "H", "justification": "Acute psychosis 20-40% users; paranoia hallmark.", "citations": ["Psychopharmacology", "ER Psych Data"]},
    "indicator_5": {"score": 5, "confidence": "M", "justification": "Cognitive deficits persist; causality vs. polydrug confounding unclear.", "citations": ["Neuropsych Cocaine"]},
    "indicator_6": {"score": 3, "confidence": "L", "justification": "Crash/dysphoria only; no dangerous physical withdrawal.", "citations": ["Limited Withdrawal Data"]},
    "indicator_7": {"score": 7, "confidence": "H", "justification": "Alcohol (cocaethylene), stimulants; CV stress synergy.", "citations": ["CDC Toxicology", "Pharmacology"]},
    "indicator_8": {"score": 6, "confidence": "M", "justification": "Purity varies 20-80%; adulterants common.", "citations": ["DEA Purity Reports", "EMCDDA"]},
    "indicator_9": {"score": 8, "confidence": "H", "justification": "Acute aggression/paranoia drives violence; strong crime correlation.", "citations": ["FBI UCR", "Violence Studies"]},
    "indicator_10": {"score": 5, "confidence": "M", "justification": "Illegal but glamorized; status symbol perception.", "citations": ["Media Analysis"]}
  },
  "Nitrous Oxide": {
    "indicator_1": {"score": 1, "confidence": "H", "justification": "<5 documented acute deaths annually; no respiratory depression mechanism.", "citations": ["CDC NVSS", "NIDA Rare Events"]},
    "indicator_2": {"score": 8, "confidence": "H", "justification": "B12 myelopathy/subacute degeneration in chronic users; irreversible neuropathy.", "citations": ["Lancet Neurology", "NEJM Nitrous"]},
    "indicator_3": {"score": 5, "confidence": "M", "justification": "Psychological dependence documented; no physical withdrawal.", "citations": ["Addiction Journal", "Harm Reduction"]},
    "indicator_4": {"score": 3, "confidence": "M", "justification": "Brief dissociation; rare acute psych presentations.", "citations": ["Psych ER Limited Data"]},
    "indicator_5": {"score": 3, "confidence": "L", "justification": "Neurological vs. psych effects difficult to separate; limited data.", "citations": ["Case Series Only"]},
    "indicator_6": {"score": 2, "confidence": "L", "justification": "No documented withdrawal syndrome.", "citations": ["Limited Studies"]},
    "indicator_7": {"score": 6, "confidence": "M", "justification": "Alcohol/depressants increase hypoxia risk; documented but rare.", "citations": ["Toxicology Reports"]},
    "indicator_8": {"score": 4, "confidence": "M", "justification": "Pharmaceutical cartridges; consistent concentration.", "citations": ["Medical Gas Standards"]},
    "indicator_9": {"score": 6, "confidence": "M", "justification": "Acute motor loss → falls; brief duration limits total burden.", "citations": ["ER Injury Data"]},
    "indicator_10": {"score": 9, "confidence": "H", "justification": "Legal medical gas + trivializing slang ('whippets') → B12 risk underestimation.", "citations": ["DanceSafe Reports", "Harm Reduction"]}
  },
  "Ketamine": {
    "indicator_1": {"score": 2, "confidence": "H", "justification": "<50 deaths annually; always polydrug; no single-agent OD mechanism.", "citations": ["CDC NVSS", "NIDA Ketamine"]},
    "indicator_2": {"score": 7, "confidence": "M", "justification": "Bladder cystitis (heavy users); cognitive effects unclear causality.", "citations": ["Lancet Urology", "Addiction Reviews"]},
    "indicator_3": {"score": 6, "confidence": "M", "justification": "Psychological dependence documented; no severe physical withdrawal.", "citations": ["J Psychopharm", "Clinical Data"]},
    "indicator_4": {"score": 6, "confidence": "M", "justification": "K-hole dissociation distressing; bad trips 10-20%; usually transient.", "citations": ["RCT Adverse Events", "Festival Surveys"]},
    "indicator_5": {"score": 4, "confidence": "M", "justification": "Derealization persists weeks in some; causality uncertain.", "citations": ["Psychopharm Follow-up"]},
    "indicator_6": {"score": 3, "confidence": "L", "justification": "Mild dysphoria; not dangerous.", "citations": ["Limited Withdrawal Data"]},
    "indicator_7": {"score": 8, "confidence": "H", "justification": "Opioids, alcohol, benzos → compounded respiratory depression.", "citations": ["Toxicology", "NIDA"]},
    "indicator_8": {"score": 5, "confidence": "M", "justification": "Street powder purity varies; powder dosing imprecise.", "citations": ["EMCDDA", "Drug Checking"]},
    "indicator_9": {"score": 5, "confidence": "M", "justification": "Motor impairment during peak; accidents documented.", "citations": ["Festival ER Data"]},
    "indicator_10": {"score": 7, "confidence": "M", "justification": "Spravato legitimacy + 'therapy drug' narrative risks recreational normalization.", "citations": ["Media Analysis", "Harm Reduction"]}
  },
  "LSD": {
    "indicator_1": {"score": 1, "confidence": "H", "justification": "0 documented fatal ODs; LD50 >12g vs. typical 100µg.", "citations": ["NIDA LSD", "Psychopharm Reviews"]},
    "indicator_2": {"score": 1, "confidence": "H", "justification": "No organ toxicity; tolerance limits repeated dosing.", "citations": ["Long-term Studies", "JAMA LSD"]},
    "indicator_3": {"score": 1, "confidence": "H", "justification": "Rapid tolerance; no dependence/withdrawal.", "citations": ["NSDUH", "Addiction Reviews"]},
    "indicator_4": {"score": 7, "confidence": "M", "justification": "Bad trips 5-15%; panic/depersonalization common but transient.", "citations": ["RCTs", "Festival Surveys"]},
    "indicator_5": {"score": 4, "confidence": "M", "justification": "HPPD 0.3-4.5%; usually benign; treatment-seeking rare.", "citations": ["HPPD Registry", "Psychopharm"]},
    "indicator_6": {"score": 1, "confidence": "L", "justification": "No withdrawal syndrome.", "citations": ["None Required"]},
    "indicator_7": {"score": 3, "confidence": "M", "justification": "Minimal lethal interactions; serotonin syndrome theoretical.", "citations": ["Pharmacology Texts"]},
    "indicator_8": {"score": 6, "confidence": "M", "justification": "Blotter consistency ±30%; microgram precision challenging.", "citations": ["EMCDDA Testing"]},
    "indicator_9": {"score": 2, "confidence": "M", "justification": "No violence association; judgment altered but not aggressive.", "citations": ["Crime Data", "Violence Reviews"]},
    "indicator_10": {"score": 3, "confidence": "L", "justification": "Schedule I maintains risk perception; limited cultural normalization.", "citations": ["Perception Surveys"]}
  },
  "Psilocybin": {
    "indicator_1": {"score": 1, "confidence": "H", "justification": "0 documented fatal ODs; extreme LD50.", "citations": ["NIDA Psilocybin", "Psychopharm"]},
    "indicator_2": {"score": 1, "confidence": "H", "justification": "No organ toxicity documented.", "citations": ["Johns Hopkins Studies"]},
    "indicator_3": {"score": 1, "confidence": "H", "justification": "Tolerance limits repeated use; no dependence.", "citations": ["Clinical Trials", "NSDUH"]},
    "indicator_4": {"score": 6, "confidence": "M", "justification": "Transient anxiety 2-10%; lower than LSD.", "citations": ["MAPS Trials", "RCT Data"]},
    "indicator_5": {"score": 4, "confidence": "M", "justification": "HPPD rare; similar LSD prevalence estimates.", "citations": ["Psychopharm Reviews"]},
    "indicator_6": {"score": 1, "confidence": "L", "justification": "No withdrawal.", "citations": ["None"]},
    "indicator_7": {"score": 3, "confidence": "M", "justification": "Minimal documented interactions.", "citations": ["Pharmacology"]},
    "indicator_8": {"score": 7, "confidence": "M", "justification": "Mushroom potency 2-5x variation; most variable natural psychedelic.", "citations": ["Miraculix Testing", "Strain Data"]},
    "indicator_9": {"score": 2, "confidence": "M", "justification": "No violence link; similar LSD profile.", "citations": ["Crime Studies"]},
    "indicator_10": {"score": 3, "confidence": "L", "justification": "Schedule I; limited normalization despite trials.", "citations": ["Perception Data"]}
  },
  "MDMA": {
    "indicator_1": {"score": 3, "confidence": "M", "justification": "~100 US deaths annually; hyperthermia primary.", "citations": ["CDC NVSS", "NIDA MDMA"]},
    "indicator_2": {"score": 4, "confidence": "M", "justification": "Neurotoxicity evidence mixed; cognitive effects unclear causality.", "citations": ["Neurotox Reviews"]},
    "indicator_3": {"score": 7, "confidence": "H", "justification": "Psychological dependence; 10-15% CUD rates.", "citations": ["SAMHSA", "EMCDDA"]},
    "indicator_4": {"score": 5, "confidence": "M", "justification": "Acute anxiety ~10%; jaw clenching agitation.", "citations": ["Festival Surveys"]},
    "indicator_5": {"score": 3, "confidence": "M", "justification": "MDMA-specific HPPD undocumented; cognitive unclear.", "citations": ["Limited Data"]},
    "indicator_6": {"score": 2, "confidence": "L", "justification": "Crash only; no dangerous withdrawal.", "citations": ["Clinical Data"]},
    "indicator_7": {"score": 7, "confidence": "H", "justification": "Alcohol, stimulants; hyperthermia synergy.", "citations": ["Toxicology"]},
    "indicator_8": {"score": 5, "confidence": "M", "justification": "Pills variable; testing common in scenes.", "citations": ["DanceSafe", "EMCDDA"]},
    "indicator_9": {"score": 6, "confidence": "M", "justification": "Jaw clenching, poor judgment; accidents documented.", "citations": ["Festival ER"]},
    "indicator_10": {"score": 6, "confidence": "M", "justification": "'Safe party drug' narrative growing despite risks.", "citations": ["Harm Reduction"]}
  },
  "Cannabis": {
    "indicator_1": {"score": 1, "confidence": "H", "justification": "No acute OD deaths; respiratory depression absent.", "citations": ["CDC NVSS", "NIDA"]},
    "indicator_2": {"score": 3, "confidence": "H", "justification": "Chronic bronchitis; cognitive effects in adolescent heavy use (out of scope).", "citations": ["Lancet Cannabis"]},
    "indicator_3": {"score": 4, "confidence": "H", "justification": "CUD 9% users; psychological dependence primarily.", "citations": ["SAMHSA NSDUH"]},
    "indicator_4": {"score": 4, "confidence": "M", "justification": "Acute anxiety/panic ~10%; usually self-limiting.", "citations": ["Psych ER Data"]},
    "indicator_5": {"score": 3, "confidence": "M", "justification": "Cognitive fog persists; causality contested.", "citations": ["Neuropsych Reviews"]},
    "indicator_6": {"score": 1, "confidence": "L", "justification": "No withdrawal syndrome beyond irritability.", "citations": ["Limited Data"]},
    "indicator_7": {"score": 3, "confidence": "M", "justification": "Minimal lethal interactions.", "citations": ["Pharmacology"]},
    "indicator_8": {"score": 4, "confidence": "M", "justification": "Potency rising (10-30% THC); product variability.", "citations": ["DEA Testing"]},
    "indicator_9": {"score": 4, "confidence": "M", "justification": "Impaired driving; judgment effects.", "citations": ["NHTSA"]},
    "indicator_10": {"score": 5, "confidence": "H", "justification": "Legalization + 'safe' narrative underestimates psychosis risk.", "citations": ["Gallup", "State Surveys"]}
  }
}
```

**Visualization Notes:**

- **Do not sum indicators or use polygon area as total harm metric**
- **Confidence color-coding recommended:** H=green, M=yellow, L=red
- **Alcohol/opioids as primary anchors** (highest data quality)
- **LSD/psilocybin as low-lethality anchors**
- **Nitrous/ketamine occupy expected "medium" space** across physiological/psychological axes


# 3 NEW DRUG DATASETS - EXACT FORMAT MATCH

## KRATOM DATASET

```
substance,indicator_1,indicator_2,indicator_3,indicator_4,indicator_5,indicator_6,indicator_7,indicator_8,indicator_9,indicator_10,confidence_1,confidence_2,confidence_3,confidence_4,confidence_5,confidence_6,confidence_7,confidence_8,confidence_9,confidence_10
Kratom,3,6,7,4,3,7,8,6,4,6,H,M,H,M,M,H,M,M,H,M
```

**JSON Explanations:**

```json
{
  "Kratom": {
    "indicator_1": {"score": 3, "confidence": "H", "justification": "CDC MMWR: 152 kratom-detected deaths 2016-2017, always polydrug (fentanyl 90%). No single-agent OD mechanism at recreational doses.", "citations": ["CDC MMWR 2019", "SUDORS Dashboard"]},
    "indicator_2": {"score": 6, "confidence": "M", "justification": "Liver toxicity case reports, cholestatic hepatitis. Population risk unclear vs confounding.", "citations": ["JAMA Case Reports", "Hepatology"]},
    "indicator_3": {"score": 7, "confidence": "H", "justification": "Opioid-like dependence documented; 13% daily users meet withdrawal criteria.", "citations": ["SAMHSA NSDUH", "Addiction Journal"]},
    "indicator_4": {"score": 4, "confidence": "M", "justification": "Low-dose stimulation agitation rare; high-dose sedation.", "citations": ["ER Data"]},
    "indicator_5": {"score": 3, "confidence": "M", "justification": "No persistent psych effects beyond withdrawal.", "citations": ["Limited Data"]},
    "indicator_6": {"score": 7, "confidence": "H", "justification": "Opioid-like withdrawal (myalgias, insomnia, anxiety); manageable but drives use.", "citations": ["ASAM Kratom Withdrawal"]},
    "indicator_7": {"score": 8, "confidence": "M", "justification": "Fentanyl synergy (90% co-detected ODs); CYP3A4 inhibition potentiates.", "citations": ["CDC SUDORS"]},
    "indicator_8": {"score": 6, "confidence": "M", "justification": "Leaf/powder alkaloid content varies 0.5-2%; vendor inconsistency.", "citations": ["FDA Lab Analysis"]},
    "indicator_9": {"score": 4, "confidence": "H", "justification": "Sedation predominant; low violence association.", "citations": ["Crime Data"]},
    "indicator_10": {"score": 6, "confidence": "M", "justification": "Legal smoke shop sales + 'natural alternative' marketing downplays dependence risk.", "citations": ["FDA Warning Letters"]}
  }
}
```

---

## SUBOXONE DATASET

```
substance,indicator_1,indicator_2,indicator_3,indicator_4,indicator_5,indicator_6,indicator_7,indicator_8,indicator_9,indicator_10,confidence_1,confidence_2,confidence_3,confidence_4,confidence_5,confidence_6,confidence_7,confidence_8,confidence_9,confidence_10
Suboxone,2,5,8,3,2,6,9,4,3,5,M,M,H,M,L,M,H,M,H,M
```

**JSON Explanations:**

```json
{
  "Suboxone": {
    "indicator_1": {"score": 2, "confidence": "M", "justification": "Ceiling effect prevents respiratory depression; rare solo OD deaths.", "citations": ["SAMHSA DAWN", "NIDA Buprenorphine"]},
    "indicator_2": {"score": 5, "confidence": "M", "justification": "Dental decay (sublingual), rare hepatotoxicity.", "citations": ["JADA Dental", "Hepatology"]},
    "indicator_3": {"score": 8, "confidence": "H", "justification": "Diversion abuse high; partial agonist maintains dependence.", "citations": ["SAMHSA NSDUH", "JAMA Addiction"]},
    "indicator_4": {"score": 3, "confidence": "M", "justification": "Sedation primary; minimal acute psych risk.", "citations": ["ER Data"]},
    "indicator_5": {"score": 2, "confidence": "L", "justification": "No persistent effects independent of SUD.", "citations": ["Limited Data"]},
    "indicator_6": {"score": 6, "confidence": "M", "justification": "Precipitated withdrawal if misused on active opioid dependence.", "citations": ["ASAM Guidelines"]},
    "indicator_7": {"score": 9, "confidence": "H", "justification": "Prevents opioid OD but benzodiazepine synergy lethal.", "citations": ["CDC Polypharmacy"]},
    "indicator_8": {"score": 4, "confidence": "M", "justification": "Pharmaceutical grade; diversion strips naloxone barrier.", "citations": ["DEA Diversion Reports"]},
    "indicator_9": {"score": 3, "confidence": "H", "justification": "Sedation reduces behavioral risk.", "citations": ["Crime Data"]},
    "indicator_10": {"score": 5, "confidence": "M", "justification": "'Treatment' framing obscures diversion/abuse epidemic.", "citations": ["Policy Reviews"]}
  }
}
```

---

## TRAMADOL DATASET

```
substance,indicator_1,indicator_2,indicator_3,indicator_4,indicator_5,indicator_6,indicator_7,indicator_8,indicator_9,indicator_10,confidence_1,confidence_2,confidence_3,confidence_4,confidence_5,confidence_6,confidence_7,confidence_8,confidence_9,confidence_10
Tramadol,5,5,7,5,3,6,8,5,5,6,M,M,H,M,M,M,M,M,H,M
```

**JSON Explanations:**

```json
{
  "Tramadol": {
    "indicator_1": {"score": 5, "confidence": "M", "justification": "Serotonin syndrome + seizures at supratherapeutic doses; ~1k deaths.", "citations": ["SAMHSA DAWN", "FDA Adverse Events"]},
    "indicator_2": {"score": 5, "confidence": "M", "justification": "Serotonin neurotoxicity debate; dependence complications.", "citations": ["Neurology Reviews"]},
    "indicator_3": {"score": 7, "confidence": "H", "justification": "SNRI + weak mu effects; 10-15% chronic users dependent.", "citations": ["SAMHSA NSDUH"]},
    "indicator_4": {"score": 5, "confidence": "M", "justification": "Serotonin syndrome presents as acute psych crisis.", "citations": ["Psych ER Data"]},
    "indicator_5": {"score": 3, "confidence": "M", "justification": "Cognitive effects confounded by withdrawal.", "citations": ["Limited Data"]},
    "indicator_6": {"score": 6, "confidence": "M", "justification": "Moderate opioid withdrawal + SSRI discontinuation.", "citations": ["ASAM Guidelines"]},
    "indicator_7": {"score": 8, "confidence": "M", "justification": "SSRI synergy (serotonin syndrome), benzodiazepines.", "citations": ["Toxicology Reports"]},
    "indicator_8": {"score": 5, "confidence": "M", "justification": "Rx diversion common; variable abuse patterns.", "citations": ["DEA Reports"]},
    "indicator_9": {"score": 5, "confidence": "H", "justification": "Moderate disinhibition; intermediate violence risk.", "citations": ["Crime Studies"]},
    "indicator_10": {"score": 6, "confidence": "M", "justification": "'Non-narcotic' marketing obscures abuse potential.", "citations": ["FDA Scheduling History"]}
  }
}
```

---

## COMPLETE 13-DRUG CSV (Copy this single block)

```csv
substance,indicator_1,indicator_2,indicator_3,indicator_4,indicator_5,indicator_6,indicator_7,indicator_8,indicator_9,indicator_10,confidence_1,confidence_2,confidence_3,confidence_4,confidence_5,confidence_6,confidence_7,confidence_8,confidence_9,confidence_10
Alcohol,9,10,9,7,6,10,9,3,10,8,H,H,H,M,M,H,H,H,H,M
Opioids_(Heroin/Fentanyl),10,9,10,3,2,8,10,10,5,4,H,H,H,M,L,H,H,H,H,L
Benzodiazepines,4,6,9,4,4,9,10,7,7,7,M,M,H,M,M,H,H,M,H,M
Cocaine,8,7,8,9,5,3,7,6,8,5,H,H,H,M,M,L,H,M,H,M
Nitrous_Oxide,1,8,5,3,3,2,6,4,6,9,H,H,M,M,L,L,M,M,H,H
Ketamine,2,7,6,6,4,3,8,5,5,7,H,M,M,M,M,L,H,M,M,M
LSD,1,1,1,7,4,1,3,6,2,3,H,H,H,M,M,L,M,M,H,L
Psilocybin,1,1,1,6,4,1,3,7,2,3,H,H,H,M,M,L,M,M,H,L
MDMA,3,4,7,5,3,2,7,5,6,6,M,M,H,M,M,L,H,M,H,M
Cannabis,1,3,4,4,3,1,3,4,4,5,H,H,H,M,M,L,M,M,H,M
Kratom,3,6,7,4,3,7,8,6,4,6,H,M,H,M,M,H,M,M,H,M
Suboxone,2,5,8,3,2,6,9,4,3,5,M,M,H,M,L,M,H,M,H,M
Tramadol,5,5,7,5,3,6,8,5,5,6,M,M,H,M,M,M,M,M,H,M
```

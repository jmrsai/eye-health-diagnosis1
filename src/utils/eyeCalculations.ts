// Advanced eye health calculations and diagnostic algorithms

export interface VisualAcuityResult {
  decimal: number;
  snellen: string;
  logMAR: number;
  category: 'normal' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment' | 'blindness';
}

export interface IntraocularPressureResult {
  pressure: number;
  risk: 'low' | 'moderate' | 'high' | 'very_high';
  recommendation: string;
}

export interface RetinalAnalysis {
  cupToDiscRatio: number;
  rnflThickness: number;
  maculaThickness: number;
  hemorrhages: number;
  exudates: number;
  microaneurysms: number;
  riskScore: number;
  diagnosis: string[];
}

export interface DiabeticsRetinopathyStaging {
  stage: 'none' | 'mild' | 'moderate' | 'severe' | 'proliferative';
  maculaEdema: boolean;
  riskScore: number;
  recommendations: string[];
  followUpInterval: number; // months
}

export interface GlaucomaAssessment {
  riskLevel: 'low' | 'moderate' | 'high' | 'severe';
  cupDiscRatio: number;
  rnflThickness: number;
  visualFieldDefects: boolean;
  iop: number;
  progressionRate: number;
  treatmentRecommendation: string;
}

export interface AMDAssessment {
  type: 'dry' | 'wet' | 'geographic_atrophy';
  stage: 'early' | 'intermediate' | 'advanced';
  drusenSize: 'small' | 'medium' | 'large';
  pigmentChanges: boolean;
  neovascularization: boolean;
  centralVisionThreat: boolean;
  treatmentUrgency: 'routine' | 'urgent' | 'emergent';
}

export interface DiabeticRetinopathyRisk {
  riskScore: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'very_high';
  annualRisk: number;
  recommendations: string[];
  screeningInterval: number; // months
}

// Visual Acuity Calculations
export function calculateVisualAcuity(distance: number, smallestLine: number): VisualAcuityResult {
  const decimal = 20 / smallestLine;
  const logMAR = Math.log10(smallestLine / 20);
  
  let category: VisualAcuityResult['category'];
  if (decimal >= 0.8) category = 'normal';
  else if (decimal >= 0.3) category = 'mild_impairment';
  else if (decimal >= 0.1) category = 'moderate_impairment';
  else if (decimal >= 0.05) category = 'severe_impairment';
  else category = 'blindness';

  return {
    decimal,
    snellen: `20/${smallestLine}`,
    logMAR,
    category
  };
}

// Diabetic Retinopathy Risk Calculator
export function calculateDiabeticRetinopathyRisk(
  diabetesDuration: number, // years
  hba1c: number, // percentage
  systolicBP: number, // mmHg
  diastolicBP: number, // mmHg
  totalCholesterol: number, // mg/dL
  smokingStatus: boolean,
  diabetesType: 1 | 2 = 2,
  age: number = 50
): DiabeticRetinopathyRisk {
  let riskScore = 0;
  const recommendations: string[] = [];

  // Duration factor (strongest predictor)
  if (diabetesDuration < 5) {
    riskScore += 1;
  } else if (diabetesDuration < 10) {
    riskScore += 3;
  } else if (diabetesDuration < 15) {
    riskScore += 5;
  } else if (diabetesDuration < 20) {
    riskScore += 7;
  } else {
    riskScore += 10;
  }

  // HbA1c factor
  if (hba1c < 7) {
    riskScore += 1;
    recommendations.push('Excellent glycemic control - maintain current regimen');
  } else if (hba1c < 8) {
    riskScore += 3;
    recommendations.push('Good glycemic control - minor adjustments may be beneficial');
  } else if (hba1c < 9) {
    riskScore += 5;
    recommendations.push('Suboptimal glycemic control - intensify diabetes management');
  } else if (hba1c < 10) {
    riskScore += 7;
    recommendations.push('Poor glycemic control - urgent diabetes management required');
  } else {
    riskScore += 10;
    recommendations.push('Very poor glycemic control - immediate intensive intervention needed');
  }

  // Blood pressure factor
  const meanBP = (systolicBP + diastolicBP * 2) / 3;
  if (meanBP < 90) {
    riskScore += 1;
  } else if (meanBP < 100) {
    riskScore += 2;
  } else if (meanBP < 110) {
    riskScore += 4;
    recommendations.push('Elevated blood pressure - consider antihypertensive therapy');
  } else {
    riskScore += 6;
    recommendations.push('Hypertension present - blood pressure control essential');
  }

  // Cholesterol factor
  if (totalCholesterol < 200) {
    riskScore += 1;
  } else if (totalCholesterol < 240) {
    riskScore += 2;
    recommendations.push('Borderline high cholesterol - lifestyle modifications recommended');
  } else {
    riskScore += 4;
    recommendations.push('High cholesterol - lipid management therapy indicated');
  }

  // Smoking factor
  if (smokingStatus) {
    riskScore += 3;
    recommendations.push('Smoking cessation critical - significantly increases retinopathy risk');
  }

  // Diabetes type factor
  if (diabetesType === 1) {
    riskScore += 2; // Type 1 generally higher risk after duration adjustment
  }

  // Age factor (protective in some cases, risk in others)
  if (age > 65) {
    riskScore += 1;
  }

  // Calculate annual risk percentage and determine risk level
  let annualRisk: number;
  let riskLevel: DiabeticRetinopathyRisk['riskLevel'];
  let screeningInterval: number;

  if (riskScore <= 8) {
    riskLevel = 'low';
    annualRisk = 2 + (riskScore * 0.5);
    screeningInterval = 24;
    recommendations.push('Annual diabetic eye examination sufficient');
  } else if (riskScore <= 15) {
    riskLevel = 'moderate';
    annualRisk = 6 + (riskScore - 8) * 1.5;
    screeningInterval = 12;
    recommendations.push('Annual eye examination with close monitoring');
  } else if (riskScore <= 22) {
    riskLevel = 'high';
    annualRisk = 17 + (riskScore - 15) * 2;
    screeningInterval = 6;
    recommendations.push('6-month eye examinations recommended');
  } else {
    riskLevel = 'very_high';
    annualRisk = Math.min(45 + (riskScore - 22) * 2.5, 85);
    screeningInterval = 3;
    recommendations.push('3-month eye examinations essential');
    recommendations.push('Consider immediate ophthalmology referral');
  }

  // Add general recommendations
  recommendations.push('Maintain optimal blood sugar control (HbA1c < 7%)');
  recommendations.push('Control blood pressure (<130/80 mmHg)');
  recommendations.push('Regular exercise and healthy diet');

  return {
    riskScore,
    riskLevel,
    annualRisk: Math.round(annualRisk * 10) / 10,
    recommendations,
    screeningInterval
  };
}

// Intraocular Pressure Assessment
export function assessIntraocularPressure(pressure: number, age: number, cornealThickness: number = 550): IntraocularPressureResult {
  // Adjust for corneal thickness (Goldmann correction)
  const correctedPressure = pressure + (cornealThickness - 550) * 0.007;
  
  let risk: IntraocularPressureResult['risk'];
  let recommendation: string;

  const ageAdjustedNormal = 16 + (age - 40) * 0.1;

  if (correctedPressure <= ageAdjustedNormal) {
    risk = 'low';
    recommendation = 'Normal pressure. Continue regular eye exams.';
  } else if (correctedPressure <= ageAdjustedNormal + 5) {
    risk = 'moderate';
    recommendation = 'Slightly elevated. Monitor closely and consider additional testing.';
  } else if (correctedPressure <= ageAdjustedNormal + 10) {
    risk = 'high';
    recommendation = 'Elevated pressure. Comprehensive glaucoma evaluation recommended.';
  } else {
    risk = 'very_high';
    recommendation = 'Significantly elevated. Urgent ophthalmologic consultation required.';
  }

  return { pressure: correctedPressure, risk, recommendation };
}

// Advanced Diabetic Retinopathy Staging
export function stageDiabeticRetinopathy(
  microaneurysms: number,
  hemorrhages: number,
  hardExudates: number,
  cottonWoolSpots: number,
  venousBeading: boolean,
  irma: boolean,
  neovascularization: boolean,
  maculaEdema: boolean
): DiabeticsRetinopathyStaging {
  let stage: DiabeticsRetinopathyStaging['stage'];
  let riskScore = 0;
  const recommendations: string[] = [];
  let followUpInterval = 12;

  // Calculate risk score
  riskScore += microaneurysms * 0.1;
  riskScore += hemorrhages * 0.2;
  riskScore += hardExudates * 0.15;
  riskScore += cottonWoolSpots * 0.3;
  if (venousBeading) riskScore += 2;
  if (irma) riskScore += 2.5;
  if (neovascularization) riskScore += 5;

  // Determine stage
  if (riskScore === 0) {
    stage = 'none';
    followUpInterval = 12;
    recommendations.push('Annual diabetic eye exam');
  } else if (riskScore < 2) {
    stage = 'mild';
    followUpInterval = 12;
    recommendations.push('Annual follow-up', 'Optimize glycemic control');
  } else if (riskScore < 5) {
    stage = 'moderate';
    followUpInterval = 6;
    recommendations.push('6-month follow-up', 'Consider laser treatment consultation');
  } else if (riskScore < 8) {
    stage = 'severe';
    followUpInterval = 3;
    recommendations.push('3-month follow-up', 'Panretinal photocoagulation indicated');
  } else {
    stage = 'proliferative';
    followUpInterval = 1;
    recommendations.push('Urgent treatment required', 'Anti-VEGF therapy', 'Vitrectomy consideration');
  }

  if (maculaEdema) {
    recommendations.push('Anti-VEGF injection for macular edema');
    followUpInterval = Math.min(followUpInterval, 1);
  }

  return {
    stage,
    maculaEdema,
    riskScore,
    recommendations,
    followUpInterval
  };
}

// Comprehensive Glaucoma Assessment
export function assessGlaucoma(
  iop: number,
  cupDiscRatio: number,
  rnflThickness: number,
  visualFieldMD: number,
  age: number,
  familyHistory: boolean,
  ethnicity: 'caucasian' | 'african' | 'hispanic' | 'asian' | 'other'
): GlaucomaAssessment {
  let riskScore = 0;
  
  // IOP contribution
  if (iop > 25) riskScore += 4;
  else if (iop > 21) riskScore += 3;
  else if (iop > 18) riskScore += 2;

  // Cup-to-disc ratio
  if (cupDiscRatio > 0.8) riskScore += 4;
  else if (cupDiscRatio > 0.6) riskScore += 3;
  else if (cupDiscRatio > 0.4) riskScore += 2;

  // RNFL thickness
  if (rnflThickness < 70) riskScore += 4;
  else if (rnflThickness < 85) riskScore += 3;
  else if (rnflThickness < 95) riskScore += 2;

  // Visual field defects
  const visualFieldDefects = visualFieldMD < -2;
  if (visualFieldDefects) {
    if (visualFieldMD < -12) riskScore += 5;
    else if (visualFieldMD < -6) riskScore += 4;
    else riskScore += 3;
  }

  // Age factor
  if (age > 70) riskScore += 2;
  else if (age > 60) riskScore += 1;

  // Family history
  if (familyHistory) riskScore += 2;

  // Ethnicity
  if (ethnicity === 'african') riskScore += 2;
  else if (ethnicity === 'hispanic') riskScore += 1;

  // Determine risk level and treatment
  let riskLevel: GlaucomaAssessment['riskLevel'];
  let treatmentRecommendation: string;
  let progressionRate = 0;

  if (riskScore < 3) {
    riskLevel = 'low';
    treatmentRecommendation = 'Observation with regular monitoring';
    progressionRate = 0.1;
  } else if (riskScore < 6) {
    riskLevel = 'moderate';
    treatmentRecommendation = 'Consider topical therapy, target IOP <18 mmHg';
    progressionRate = 0.3;
  } else if (riskScore < 10) {
    riskLevel = 'high';
    treatmentRecommendation = 'Initiate therapy, target IOP <15 mmHg';
    progressionRate = 0.6;
  } else {
    riskLevel = 'severe';
    treatmentRecommendation = 'Aggressive therapy, consider surgery, target IOP <12 mmHg';
    progressionRate = 1.0;
  }

  return {
    riskLevel,
    cupDiscRatio,
    rnflThickness,
    visualFieldDefects,
    iop,
    progressionRate,
    treatmentRecommendation
  };
}

// AMD Assessment Algorithm
export function assessAMD(
  drusenSize: 'none' | 'small' | 'medium' | 'large',
  drusenArea: number,
  pigmentChanges: boolean,
  geographicAtrophy: boolean,
  neovascularization: boolean,
  subretinalFluid: boolean,
  age: number
): AMDAssessment {
  let stage: AMDAssessment['stage'];
  let type: AMDAssessment['type'];
  let centralVisionThreat = false;
  let treatmentUrgency: AMDAssessment['treatmentUrgency'] = 'routine';

  // Determine type
  if (neovascularization || subretinalFluid) {
    type = 'wet';
    centralVisionThreat = true;
    treatmentUrgency = 'emergent';
  } else if (geographicAtrophy) {
    type = 'geographic_atrophy';
    centralVisionThreat = true;
    treatmentUrgency = 'urgent';
  } else {
    type = 'dry';
  }

  // Determine stage
  if (drusenSize === 'none' || (drusenSize === 'small' && drusenArea < 125)) {
    stage = 'early';
  } else if (drusenSize === 'medium' || (drusenSize === 'large' && drusenArea < 250)) {
    stage = 'intermediate';
    if (pigmentChanges) centralVisionThreat = true;
  } else {
    stage = 'advanced';
    centralVisionThreat = true;
    if (treatmentUrgency === 'routine') treatmentUrgency = 'urgent';
  }

  return {
    type,
    stage,
    drusenSize,
    pigmentChanges,
    neovascularization,
    centralVisionThreat,
    treatmentUrgency
  };
}

// Retinal Thickness Analysis with AI Enhancement
export function analyzeRetinalThickness(
  centralThickness: number,
  averageThickness: number,
  volumeData: number[],
  age: number,
  gender: 'male' | 'female'
): {
  status: 'normal' | 'thin' | 'thick' | 'edema' | 'atrophy';
  recommendation: string;
  aiConfidence: number;
  riskFactors: string[];
} {
  const normalCentral = gender === 'male' ? 270 - (age - 40) * 0.5 : 260 - (age - 40) * 0.4;
  const normalAverage = gender === 'male' ? 290 - (age - 40) * 0.3 : 280 - (age - 40) * 0.3;
  
  const riskFactors: string[] = [];
  let status: 'normal' | 'thin' | 'thick' | 'edema' | 'atrophy';
  let recommendation: string;
  let aiConfidence = 0.95;

  // Analyze volume data for patterns
  const volumeVariability = Math.sqrt(volumeData.reduce((sum, v, i, arr) => {
    const mean = arr.reduce((a, b) => a + b) / arr.length;
    return sum + Math.pow(v - mean, 2);
  }, 0) / volumeData.length);

  if (centralThickness > normalCentral + 100) {
    status = 'edema';
    recommendation = 'Significant macular edema detected. Immediate anti-VEGF therapy indicated.';
    riskFactors.push('Severe fluid accumulation', 'Vision-threatening edema');
    aiConfidence = 0.98;
  } else if (centralThickness > normalCentral + 50) {
    status = 'thick';
    recommendation = 'Macular thickening observed. Consider anti-VEGF therapy or steroid injection.';
    riskFactors.push('Moderate fluid retention', 'Progressive thickening');
    aiConfidence = 0.92;
  } else if (centralThickness < normalCentral - 50 && volumeVariability > 20) {
    status = 'atrophy';
    recommendation = 'Geographic atrophy detected. Monitor progression and consider complement inhibitors.';
    riskFactors.push('Progressive atrophy', 'Central vision threat');
    aiConfidence = 0.89;
  } else if (centralThickness < normalCentral - 30) {
    status = 'thin';
    recommendation = 'Retinal thinning noted. Monitor for progression and underlying causes.';
    riskFactors.push('Tissue loss', 'Potential progression risk');
    aiConfidence = 0.85;
  } else {
    status = 'normal';
    recommendation = 'Retinal thickness within normal limits. Continue routine monitoring.';
    aiConfidence = 0.96;
  }

  // Age-related risk factors
  if (age > 65) riskFactors.push('Age-related changes');
  if (gender === 'female' && age > 50) riskFactors.push('Post-menopausal changes');

  return { status, recommendation, aiConfidence, riskFactors };
}

// Comprehensive Eye Health Score with AI Integration
export function calculateComprehensiveEyeHealthScore(
  visualAcuity: { left: number; right: number },
  iop: { left: number; right: number },
  retinalThickness: { central: number; average: number },
  visualField: { md: number; psd: number },
  age: number,
  riskFactors: {
    diabetes: boolean;
    hypertension: boolean;
    smoking: boolean;
    familyHistory: boolean;
    myopia: number;
  }
): {
  overallScore: number;
  category: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  componentScores: {
    vision: number;
    pressure: number;
    structure: number;
    function: number;
  };
  recommendations: string[];
  aiInsights: string[];
  riskAssessment: {
    glaucoma: number;
    amd: number;
    diabeticRetinopathy: number;
  };
} {
  let overallScore = 100;
  const recommendations: string[] = [];
  const aiInsights: string[] = [];

  // Component scores
  const componentScores = {
    vision: 100,
    pressure: 100,
    structure: 100,
    function: 100
  };

  // Visual acuity assessment
  const avgVA = (visualAcuity.left + visualAcuity.right) / 2;
  if (avgVA < 0.8) {
    const visionLoss = (0.8 - avgVA) * 100;
    componentScores.vision -= visionLoss;
    overallScore -= visionLoss * 0.3;
    recommendations.push('Comprehensive refraction and vision correction evaluation');
    aiInsights.push(`Visual acuity reduction detected (${(avgVA * 100).toFixed(0)}% of normal)`);
  }

  // IOP assessment
  const avgIOP = (iop.left + iop.right) / 2;
  if (avgIOP > 21) {
    const pressureExcess = (avgIOP - 21) * 5;
    componentScores.pressure -= pressureExcess;
    overallScore -= pressureExcess * 0.25;
    recommendations.push('Glaucoma evaluation and IOP monitoring required');
    aiInsights.push(`Elevated intraocular pressure detected (${avgIOP.toFixed(1)} mmHg)`);
  }

  // Structural assessment
  if (retinalThickness.central > 300 || retinalThickness.central < 200) {
    const structuralAbnormality = Math.abs(retinalThickness.central - 250) / 250 * 100;
    componentScores.structure -= structuralAbnormality;
    overallScore -= structuralAbnormality * 0.2;
    recommendations.push('Retinal imaging and structural analysis indicated');
    aiInsights.push(`Retinal thickness abnormality detected (${retinalThickness.central}μm)`);
  }

  // Functional assessment
  if (visualField.md < -2) {
    const fieldDefect = Math.abs(visualField.md) * 10;
    componentScores.function -= fieldDefect;
    overallScore -= fieldDefect * 0.25;
    recommendations.push('Visual field monitoring and neurological evaluation');
    aiInsights.push(`Visual field defect detected (MD: ${visualField.md.toFixed(1)} dB)`);
  }

  // Risk factor adjustments
  const riskAssessment = {
    glaucoma: 0,
    amd: 0,
    diabeticRetinopathy: 0
  };

  if (riskFactors.diabetes) {
    overallScore -= 10;
    riskAssessment.diabeticRetinopathy = 35 + (age > 50 ? 15 : 0);
    recommendations.push('Annual diabetic retinopathy screening mandatory');
    aiInsights.push('Diabetes significantly increases retinopathy risk');
  }

  if (riskFactors.hypertension) {
    overallScore -= 5;
    riskAssessment.glaucoma += 10;
    recommendations.push('Blood pressure optimization for eye health');
  }

  if (riskFactors.smoking) {
    overallScore -= 8;
    riskAssessment.amd = 25 + (age > 60 ? 20 : 0);
    recommendations.push('Smoking cessation critical for preventing AMD');
    aiInsights.push('Smoking is the primary modifiable risk factor for AMD');
  }

  if (riskFactors.familyHistory) {
    overallScore -= 5;
    riskAssessment.glaucoma += 15;
    recommendations.push('Enhanced screening due to genetic predisposition');
  }

  if (riskFactors.myopia > 6) {
    overallScore -= 3;
    riskAssessment.glaucoma += 8;
    recommendations.push('High myopia monitoring for retinal complications');
  }

  // Age-related adjustments
  if (age > 60) {
    overallScore -= (age - 60) * 0.5;
    riskAssessment.amd += (age - 60) * 2;
    riskAssessment.glaucoma += (age - 60) * 1.5;
    recommendations.push('Age-appropriate comprehensive eye examination frequency');
  }

  // Ensure scores are within bounds
  overallScore = Math.max(0, Math.min(100, overallScore));
  Object.keys(componentScores).forEach(key => {
    componentScores[key as keyof typeof componentScores] = Math.max(0, Math.min(100, componentScores[key as keyof typeof componentScores]));
  });

  // Determine category
  let category: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  if (overallScore >= 90) category = 'excellent';
  else if (overallScore >= 75) category = 'good';
  else if (overallScore >= 60) category = 'fair';
  else if (overallScore >= 40) category = 'poor';
  else category = 'critical';

  // AI-powered insights
  if (category === 'excellent') {
    aiInsights.push('Optimal eye health detected. Continue current preventive measures.');
  } else if (category === 'critical') {
    aiInsights.push('Multiple risk factors detected. Immediate comprehensive evaluation required.');
  }

  return {
    overallScore,
    category,
    componentScores,
    recommendations,
    aiInsights,
    riskAssessment
  };
}

// Color Vision Assessment
export function assessColorVision(
  ishiharaScore: number,
  farnsworthScore: number,
  testType: 'screening' | 'diagnostic'
): {
  type: 'normal' | 'protanomaly' | 'protanopia' | 'deuteranomaly' | 'deuteranopia' | 'tritanomaly' | 'tritanopia' | 'monochromacy';
  severity: 'mild' | 'moderate' | 'severe';
  recommendation: string;
  occupationalImpact: string[];
} {
  let type: 'normal' | 'protanomaly' | 'protanopia' | 'deuteranomaly' | 'deuteranopia' | 'tritanomaly' | 'tritanopia' | 'monochromacy';
  let severity: 'mild' | 'moderate' | 'severe';
  let recommendation: string;
  const occupationalImpact: string[] = [];

  // Analyze Ishihara results
  if (ishiharaScore >= 13) {
    type = 'normal';
    severity = 'mild';
    recommendation = 'Normal color vision. No restrictions.';
  } else if (ishiharaScore >= 9) {
    type = 'deuteranomaly';
    severity = 'mild';
    recommendation = 'Mild red-green color deficiency. Most activities unaffected.';
    occupationalImpact.push('May affect some electrical work', 'Traffic signal recognition may be impaired');
  } else if (ishiharaScore >= 5) {
    type = 'deuteranomaly';
    severity = 'moderate';
    recommendation = 'Moderate red-green color deficiency. Some occupational limitations.';
    occupationalImpact.push('Electrical work restrictions', 'Aviation limitations', 'Some medical procedures affected');
  } else {
    type = 'deuteranopia';
    severity = 'severe';
    recommendation = 'Severe red-green color deficiency. Significant occupational restrictions.';
    occupationalImpact.push('Commercial driving restrictions', 'Aviation disqualification', 'Electrical work prohibited');
  }

  // Refine with Farnsworth D-15 if available
  if (testType === 'diagnostic' && farnsworthScore > 0) {
    if (farnsworthScore > 2.0) {
      severity = 'severe';
    } else if (farnsworthScore > 1.5) {
      severity = 'moderate';
    }
  }

  return { type, severity, recommendation, occupationalImpact };
}

// Pediatric Vision Assessment
export function assessPediatricVision(
  age: number, // months
  visualBehavior: {
    fixation: boolean;
    following: boolean;
    reaching: boolean;
    socialSmiling: boolean;
  },
  reflexes: {
    pupillary: boolean;
    blink: boolean;
    optokinetic: boolean;
  }
): {
  developmentStatus: 'normal' | 'delayed' | 'concerning';
  milestones: string[];
  recommendations: string[];
  followUpInterval: number; // months
} {
  const milestones: string[] = [];
  const recommendations: string[] = [];
  let developmentStatus: 'normal' | 'delayed' | 'concerning' = 'normal';
  let followUpInterval = 12;

  // Age-appropriate milestones
  if (age >= 2) {
    if (!reflexes.pupillary || !reflexes.blink) {
      developmentStatus = 'concerning';
      recommendations.push('Immediate pediatric ophthalmology referral');
      followUpInterval = 1;
    }
  }

  if (age >= 6) {
    if (!visualBehavior.fixation) {
      developmentStatus = 'delayed';
      recommendations.push('Vision stimulation therapy', 'Pediatric ophthalmology evaluation');
      followUpInterval = 3;
    } else {
      milestones.push('Fixation achieved');
    }
  }

  if (age >= 12) {
    if (!visualBehavior.following) {
      developmentStatus = 'delayed';
      recommendations.push('Tracking exercises', 'Neurological evaluation');
      followUpInterval = 3;
    } else {
      milestones.push('Visual tracking developed');
    }
  }

  if (age >= 18) {
    if (!visualBehavior.reaching) {
      developmentStatus = 'delayed';
      recommendations.push('Hand-eye coordination therapy');
      followUpInterval = 6;
    } else {
      milestones.push('Hand-eye coordination normal');
    }
  }

  if (age >= 24) {
    if (!visualBehavior.socialSmiling) {
      developmentStatus = 'concerning';
      recommendations.push('Comprehensive developmental assessment');
      followUpInterval = 3;
    } else {
      milestones.push('Social visual interaction normal');
    }
  }

  if (developmentStatus === 'normal') {
    recommendations.push('Continue routine pediatric eye care');
    if (age < 36) followUpInterval = 6;
    else followUpInterval = 12;
  }

  return { developmentStatus, milestones, recommendations, followUpInterval };
}
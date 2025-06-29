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

// Intraocular Pressure Assessment
export function assessIntraocularPressure(pressure: number, age: number): IntraocularPressureResult {
  let risk: IntraocularPressureResult['risk'];
  let recommendation: string;

  const ageAdjustedNormal = 16 + (age - 40) * 0.1;

  if (pressure <= ageAdjustedNormal) {
    risk = 'low';
    recommendation = 'Normal pressure. Continue regular eye exams.';
  } else if (pressure <= ageAdjustedNormal + 5) {
    risk = 'moderate';
    recommendation = 'Slightly elevated. Monitor closely and consider additional testing.';
  } else if (pressure <= ageAdjustedNormal + 10) {
    risk = 'high';
    recommendation = 'Elevated pressure. Comprehensive glaucoma evaluation recommended.';
  } else {
    risk = 'very_high';
    recommendation = 'Significantly elevated. Urgent ophthalmologic consultation required.';
  }

  return { pressure, risk, recommendation };
}

// Diabetic Retinopathy Risk Calculator
export function calculateDiabeticRetinopathyRisk(
  diabetesDuration: number,
  hba1c: number,
  bloodPressure: { systolic: number; diastolic: number },
  cholesterol: number,
  smoking: boolean
): number {
  let riskScore = 0;

  // Duration of diabetes (years)
  if (diabetesDuration < 5) riskScore += 1;
  else if (diabetesDuration < 10) riskScore += 2;
  else if (diabetesDuration < 15) riskScore += 3;
  else riskScore += 4;

  // HbA1c levels
  if (hba1c < 7) riskScore += 1;
  else if (hba1c < 8) riskScore += 2;
  else if (hba1c < 9) riskScore += 3;
  else riskScore += 4;

  // Blood pressure
  const meanBP = (bloodPressure.systolic + bloodPressure.diastolic) / 2;
  if (meanBP > 100) riskScore += 2;
  else if (meanBP > 90) riskScore += 1;

  // Cholesterol
  if (cholesterol > 240) riskScore += 2;
  else if (cholesterol > 200) riskScore += 1;

  // Smoking
  if (smoking) riskScore += 2;

  return Math.min(riskScore / 15 * 100, 100); // Convert to percentage
}

// Glaucoma Risk Assessment
export function assessGlaucomaRisk(
  age: number,
  iop: number,
  cupToDiscRatio: number,
  familyHistory: boolean,
  ethnicity: 'caucasian' | 'african' | 'hispanic' | 'asian' | 'other',
  myopia: number
): number {
  let riskScore = 0;

  // Age factor
  if (age > 60) riskScore += 3;
  else if (age > 40) riskScore += 2;
  else if (age > 30) riskScore += 1;

  // IOP
  if (iop > 25) riskScore += 4;
  else if (iop > 21) riskScore += 3;
  else if (iop > 18) riskScore += 2;
  else if (iop > 15) riskScore += 1;

  // Cup-to-disc ratio
  if (cupToDiscRatio > 0.7) riskScore += 4;
  else if (cupToDiscRatio > 0.5) riskScore += 3;
  else if (cupToDiscRatio > 0.3) riskScore += 2;

  // Family history
  if (familyHistory) riskScore += 3;

  // Ethnicity
  if (ethnicity === 'african') riskScore += 2;
  else if (ethnicity === 'hispanic') riskScore += 1;

  // Myopia
  if (myopia > 6) riskScore += 2;
  else if (myopia > 3) riskScore += 1;

  return Math.min(riskScore / 20 * 100, 100);
}

// AMD Risk Calculator
export function calculateAMDRisk(
  age: number,
  smoking: boolean,
  familyHistory: boolean,
  diet: 'poor' | 'average' | 'good',
  supplements: boolean,
  sunExposure: 'low' | 'moderate' | 'high'
): number {
  let riskScore = 0;

  // Age is the strongest risk factor
  if (age > 75) riskScore += 5;
  else if (age > 65) riskScore += 4;
  else if (age > 55) riskScore += 3;
  else if (age > 45) riskScore += 2;

  // Smoking
  if (smoking) riskScore += 4;

  // Family history
  if (familyHistory) riskScore += 3;

  // Diet
  if (diet === 'poor') riskScore += 2;
  else if (diet === 'average') riskScore += 1;

  // Supplements (protective)
  if (!supplements) riskScore += 1;

  // Sun exposure
  if (sunExposure === 'high') riskScore += 2;
  else if (sunExposure === 'moderate') riskScore += 1;

  return Math.min(riskScore / 18 * 100, 100);
}

// Retinal Thickness Analysis
export function analyzeRetinalThickness(
  centralThickness: number,
  averageThickness: number,
  age: number,
  gender: 'male' | 'female'
): {
  status: 'normal' | 'thin' | 'thick' | 'edema';
  recommendation: string;
} {
  // Normal values adjusted for age and gender
  const normalCentral = gender === 'male' ? 270 - (age - 40) * 0.5 : 260 - (age - 40) * 0.4;
  const normalAverage = gender === 'male' ? 290 - (age - 40) * 0.3 : 280 - (age - 40) * 0.3;

  if (centralThickness > normalCentral + 50 || averageThickness > normalAverage + 30) {
    return {
      status: 'edema',
      recommendation: 'Macular edema detected. Immediate ophthalmologic evaluation required.'
    };
  } else if (centralThickness > normalCentral + 20 || averageThickness > normalAverage + 15) {
    return {
      status: 'thick',
      recommendation: 'Retinal thickening observed. Follow-up recommended within 3 months.'
    };
  } else if (centralThickness < normalCentral - 30 || averageThickness < normalAverage - 20) {
    return {
      status: 'thin',
      recommendation: 'Retinal thinning noted. Consider additional testing for atrophy.'
    };
  } else {
    return {
      status: 'normal',
      recommendation: 'Retinal thickness within normal limits. Continue routine monitoring.'
    };
  }
}

// Comprehensive Eye Health Score
export function calculateEyeHealthScore(
  visualAcuity: { left: number; right: number },
  iop: { left: number; right: number },
  age: number,
  riskFactors: {
    diabetes: boolean;
    hypertension: boolean;
    smoking: boolean;
    familyHistory: boolean;
  }
): {
  score: number;
  category: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  recommendations: string[];
} {
  let score = 100;
  const recommendations: string[] = [];

  // Visual acuity impact
  const avgVA = (visualAcuity.left + visualAcuity.right) / 2;
  if (avgVA < 0.8) {
    score -= (0.8 - avgVA) * 50;
    recommendations.push('Consider vision correction or further evaluation');
  }

  // IOP impact
  const avgIOP = (iop.left + iop.right) / 2;
  if (avgIOP > 21) {
    score -= (avgIOP - 21) * 2;
    recommendations.push('Monitor intraocular pressure closely');
  }

  // Age factor
  if (age > 60) {
    score -= (age - 60) * 0.5;
    recommendations.push('Increase frequency of comprehensive eye exams');
  }

  // Risk factors
  if (riskFactors.diabetes) {
    score -= 10;
    recommendations.push('Annual diabetic retinopathy screening required');
  }
  if (riskFactors.hypertension) {
    score -= 5;
    recommendations.push('Monitor for hypertensive retinopathy');
  }
  if (riskFactors.smoking) {
    score -= 8;
    recommendations.push('Smoking cessation strongly recommended');
  }
  if (riskFactors.familyHistory) {
    score -= 5;
    recommendations.push('Genetic counseling and enhanced screening may be beneficial');
  }

  score = Math.max(0, Math.min(100, score));

  let category: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  if (score >= 90) category = 'excellent';
  else if (score >= 75) category = 'good';
  else if (score >= 60) category = 'fair';
  else if (score >= 40) category = 'poor';
  else category = 'critical';

  return { score, category, recommendations };
}
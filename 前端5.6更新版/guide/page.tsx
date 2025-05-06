import Link from 'next/link';
import React, { useState } from 'react';

const GuidePage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [patientAge, setPatientAge] = useState(0);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const symptomData = {
        '头部': ['头痛', '头晕', '外伤', '发热', '失眠'],
        '胸部': ['胸痛', '胸闷', '心悸', '乳房肿块', '咳嗽'],
        '腹部': ['腹痛', '腹泻', '恶心呕吐', '便秘', '腹胀'],
        '生殖系统': ['月经不调', '下腹痛', '阴道出血', '早孕检查', '性传播疾病']
    };

    const departmentRules = {
        // 内科症状
        '头痛': '内科',
        '头晕': '内科',
        '发热': '内科',
        '胸闷': '内科',
        '心悸': '内科',
        '腹泻': '内科',
        '恶心呕吐': '内科',
        '便秘': '内科',

        // 外科症状
        '外伤': '外科',
        '乳房肿块': '外科',
        '腹痛': '外科',
        '腹胀': '外科',

        // 妇产科症状
        '月经不调': '妇产科',
        '下腹痛': '妇产科',
        '阴道出血': '妇产科',
        '早孕检查': '妇产科',
        '性传播疾病': '妇产科'
    };

    const checkAge = () => {
        const age = parseInt(document.getElementById('ageInput').value);
        if (isNaN(age) || age < 0 || age > 120) {
            alert("请输入有效的年龄（0-120岁）");
            return;
        }

        setPatientAge(age);

        // 儿童直接推荐儿科
        if (age < 14) {
            showPediatricResult();
        } else {
            setCurrentStep(2);
        }
    };

    const showPediatricResult = () => {
        setCurrentStep(4);
    };

    const selectSymptom = (symptom) => {
        setSelectedSymptoms([...selectedSymptoms, symptom]);

        // 特殊逻辑：妇产科症状直接推荐
        if (symptom.includes('月经') || symptom.includes('阴道') ||
            symptom.includes('早孕') || symptom.includes('性病')) {
            showFinalRecommendation('妇产科');
        } else {
            showFinalRecommendation();
        }
    };

    const showFinalRecommendation = (specialDept) => {
        const matchedDept = specialDept || findDepartment(selectedSymptoms);
        setCurrentStep(4);
    };

    const findDepartment = (symptoms) => {
        for (let symptom of symptoms) {
            if (departmentRules[symptom]) {
                return departmentRules[symptom];
            }
        }
        return '内科'; // 默认推荐内科
    };

    const goBackToStep1 = () => {
        setCurrentStep(1);
        setSelectedSymptoms([]);
    };

    const restartGuide = () => {
        window.location.reload();
    };

    const updateStepIndicator = (step) => {
        setCurrentStep(step);
    };

    return (
        <div>
            <header>
                <h1>智能症状分诊系统</h1>
                <Link href="/" className="return-btn">返回首页</Link>
            </header>
            <div className="guide-steps">
                <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                <div className={`step-indicator ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                <div className={`step-indicator ${currentStep >= 4 ? 'active' : ''}`}>4</div>
            </div>

            {/* 步骤1：年龄输入 */}
            {currentStep === 1 && (
                <div id="step1" className="age-input">
                    <h2>请先输入患者年龄</h2>
                    <input type="number" id="ageInput" min="0" max="120" placeholder="请输入周岁年龄" />
                    <div className="age-tip">（儿童患者请直接挂儿科门诊）</div>
                    <button className="guide-dialog" onClick={checkAge}>下一步</button>
                </div>
            )}

            {/* 步骤2：选择身体部位 */}
            {currentStep === 2 && (
                <div id="step2" className="symptom-selection">
                    {/* 原有身体部位选择内容保持不变 */}
                </div>
            )}

            {/* 步骤3：选择具体症状 */}
            {currentStep === 3 && (
                <div id="step3" className="symptom-selection symptom-options">
                    {/* 原有症状选择内容保持不变 */}
                </div>
            )}

            {/* 步骤4：显示推荐结果 */}
            {currentStep === 4 && (
                <div id="resultSection">
                    {/* 原有结果显示内容保持不变 */}
                </div>
            )}
        </div>
    );
};

export default GuidePage;
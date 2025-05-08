'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const GuidePage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [patientAge, setPatientAge] = useState<number | null>(null);
    const [selectedPart, setSelectedPart] = useState<string | null>(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [recommendDept, setRecommendDept] = useState<string | null>(null);

    const symptomData: Record<string, string[]> = {
        '头部': ['头痛', '头晕', '外伤', '发热', '失眠'],
        '胸部': ['胸痛', '胸闷', '心悸', '乳房肿块', '咳嗽'],
        '腹部': ['腹痛', '腹泻', '恶心呕吐', '便秘', '腹胀'],
        '生殖系统': ['月经不调', '下腹痛', '阴道出血', '早孕检查', '性传播疾病']
    };

    const departmentRules: Record<string, string> = {
        // 内科症状
        '头痛': '内科',
        '头晕': '内科',
        '发热': '内科',
        '胸闷': '内科',
        '心悸': '内科',
        '腹泻': '内科',
        '恶心呕吐': '内科',
        '便秘': '内科',
        '咳嗽': '内科',
        '失眠': '内科',

        // 外科症状
        '外伤': '外科',
        '乳房肿块': '外科',
        '腹痛': '外科',
        '腹胀': '外科',
        '胸痛': '外科',

        // 妇产科症状
        '月经不调': '妇产科',
        '下腹痛': '妇产科',
        '阴道出血': '妇产科',
        '早孕检查': '妇产科',
        '性传播疾病': '妇产科'
    };

    // 步骤1：输入年龄
    const handleAgeNext = () => {
        const ageInput = document.getElementById('ageInput') as HTMLInputElement;
        const age = parseInt(ageInput.value);
        if (isNaN(age) || age < 0 || age > 120) {
            alert("请输入有效的年龄（0-120岁）");
            return;
        }
        setPatientAge(age);
        if (age < 14) {
            setRecommendDept('儿科');
            setCurrentStep(4);
        } else {
            setCurrentStep(2);
        }
    };

    // 步骤2：选择部位
    const handlePartSelect = (part: string) => {
        setSelectedPart(part);
        setCurrentStep(3);
    };

    // 步骤3：选择症状
    const handleSymptomSelect = (symptom: string) => {
        const newSymptoms = [...selectedSymptoms, symptom];
        setSelectedSymptoms(newSymptoms);

        // 妇产科症状直接推荐
        if (
            symptom.includes('月经') ||
            symptom.includes('阴道') ||
            symptom.includes('早孕') ||
            symptom.includes('性传播')
        ) {
            setRecommendDept('妇产科');
            setCurrentStep(4);
        } else {
            // 只选一个症状就推荐
            const dept = departmentRules[symptom] || '内科';
            setRecommendDept(dept);
            setCurrentStep(4);
        }
    };

    // 重新开始
    const restartGuide = () => {
        setCurrentStep(1);
        setPatientAge(null);
        setSelectedPart(null);
        setSelectedSymptoms([]);
        setRecommendDept(null);
    };

    return (
        <div className="bg-white min-h-screen">
            <header className="bg-[#0072c6] text-white py-6 shadow-lg">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">智能症状分诊系统</h1>
                    <Link href="/" className="bg-white/10 hover:bg-white/20 text-sm px-6 py-2 rounded-full transition-all">
                        返回首页
                    </Link>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* 步骤指示器样式更新 */}
                <div className="flex justify-center gap-4 mb-12">
                    {[1, 2, 3, 4].map(step => (
                        <div 
                            key={step}
                            className={`w-12 h-12 rounded-full flex items-center justify-center 
                                ${currentStep >= step 
                                    ? 'bg-[#0072c6] text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-500'}`}
                        >
                            {step}
                        </div>
                    ))}
                </div>

                {/* 步骤1：年龄输入 - 优化样式 */}
                {currentStep === 1 && (
                    <div className="text-center bg-gray-50 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-2xl text-[#0072c6] mb-6 font-semibold">
                            请先输入患者年龄
                        </h2>
                        <input 
                            type="number" 
                            id="ageInput"
                            className="w-full max-w-xs mx-auto px-6 py-4 text-lg border-2 border-[#0072c6] rounded-xl
                                      focus:ring-4 focus:ring-blue-200 focus:outline-none"
                            min="0" 
                            max="120" 
                            placeholder="请输入周岁年龄"
                        />
                        <p className="mt-4 text-gray-500 text-sm">（儿童患者请直接挂儿科门诊）</p>
                        <button 
                            className="mt-8 bg-[#0072c6] hover:bg-[#005ba3] text-white px-12 py-4 rounded-xl
                                     text-lg font-semibold transition-all shadow-md hover:shadow-lg"
                            onClick={handleAgeNext}
                        >
                            下一步
                        </button>
                    </div>
                )}

                {/* 步骤2：选择身体部位 - 优化样式 */}
                {currentStep === 2 && (
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-2xl text-[#0072c6] mb-8 text-center font-semibold">
                            请选择不适部位
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.keys(symptomData).map((part) => (
                                <button
                                    key={part}
                                    onClick={() => handlePartSelect(part)}
                                    className="p-6 bg-white hover:bg-blue-50 rounded-xl border-2 border-[#0072c6]
                                             text-[#0072c6] font-medium transition-all shadow-sm hover:shadow-md"
                                >
                                    {part}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 步骤3：选择具体症状 - 优化样式 */}
                {currentStep === 3 && selectedPart && (
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-2xl text-[#0072c6] mb-8 text-center font-semibold">
                            请选择具体症状
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {symptomData[selectedPart].map((symptom) => (
                                <button
                                    key={symptom}
                                    onClick={() => handleSymptomSelect(symptom)}
                                    className="p-4 bg-white hover:bg-blue-50 rounded-lg border-2 border-blue-100
                                             text-gray-700 hover:text-[#0072c6] text-left transition-all
                                             shadow-sm hover:shadow-md"
                                >
                                    {symptom}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 步骤4：显示推荐结果 - 优化样式 */}
                {currentStep === 4 && (
                    <div className="text-center bg-gray-50 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-2xl text-[#0072c6] mb-6 font-semibold">
                            推荐科室
                        </h2>
                        <div className="text-3xl text-green-600 font-bold mb-8">
                            {recommendDept ? `建议挂号：${recommendDept}` : '请重新选择'}
                        </div>
                        <button 
                            onClick={restartGuide}
                            className="bg-[#0072c6] hover:bg-[#005ba3] text-white px-12 py-4 rounded-xl
                                     text-lg font-semibold transition-all shadow-md hover:shadow-lg"
                        >
                            重新分诊
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuidePage;
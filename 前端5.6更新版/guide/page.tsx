import Link from 'next/link';
import React, { useState } from 'react';

const GuidePage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [patientAge, setPatientAge] = useState(0);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const symptomData = {
        'ͷ��': ['ͷʹ', 'ͷ��', '����', '����', 'ʧ��'],
        '�ز�': ['��ʹ', '����', '�ļ�', '�鷿�׿�', '����'],
        '����': ['��ʹ', '��к', '����Ż��', '����', '����'],
        '��ֳϵͳ': ['�¾�����', '�¸�ʹ', '������Ѫ', '���м��', '�Դ�������']
    };

    const departmentRules = {
        // �ڿ�֢״
        'ͷʹ': '�ڿ�',
        'ͷ��': '�ڿ�',
        '����': '�ڿ�',
        '����': '�ڿ�',
        '�ļ�': '�ڿ�',
        '��к': '�ڿ�',
        '����Ż��': '�ڿ�',
        '����': '�ڿ�',

        // ���֢״
        '����': '���',
        '�鷿�׿�': '���',
        '��ʹ': '���',
        '����': '���',

        // ������֢״
        '�¾�����': '������',
        '�¸�ʹ': '������',
        '������Ѫ': '������',
        '���м��': '������',
        '�Դ�������': '������'
    };

    const checkAge = () => {
        const age = parseInt(document.getElementById('ageInput').value);
        if (isNaN(age) || age < 0 || age > 120) {
            alert("��������Ч�����䣨0-120�꣩");
            return;
        }

        setPatientAge(age);

        // ��ֱͯ���Ƽ�����
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

        // �����߼���������֢״ֱ���Ƽ�
        if (symptom.includes('�¾�') || symptom.includes('����') ||
            symptom.includes('����') || symptom.includes('�Բ�')) {
            showFinalRecommendation('������');
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
        return '�ڿ�'; // Ĭ���Ƽ��ڿ�
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
                <h1>����֢״����ϵͳ</h1>
                <Link href="/" className="return-btn">������ҳ</Link>
            </header>
            <div className="guide-steps">
                <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                <div className={`step-indicator ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                <div className={`step-indicator ${currentStep >= 4 ? 'active' : ''}`}>4</div>
            </div>

            {/* ����1���������� */}
            {currentStep === 1 && (
                <div id="step1" className="age-input">
                    <h2>�������뻼������</h2>
                    <input type="number" id="ageInput" min="0" max="120" placeholder="��������������" />
                    <div className="age-tip">����ͯ������ֱ�ӹҶ������</div>
                    <button className="guide-dialog" onClick={checkAge}>��һ��</button>
                </div>
            )}

            {/* ����2��ѡ�����岿λ */}
            {currentStep === 2 && (
                <div id="step2" className="symptom-selection">
                    {/* ԭ�����岿λѡ�����ݱ��ֲ��� */}
                </div>
            )}

            {/* ����3��ѡ�����֢״ */}
            {currentStep === 3 && (
                <div id="step3" className="symptom-selection symptom-options">
                    {/* ԭ��֢״ѡ�����ݱ��ֲ��� */}
                </div>
            )}

            {/* ����4����ʾ�Ƽ���� */}
            {currentStep === 4 && (
                <div id="resultSection">
                    {/* ԭ�н����ʾ���ݱ��ֲ��� */}
                </div>
            )}
        </div>
    );
};

export default GuidePage;
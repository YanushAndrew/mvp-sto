import React, { useState } from 'react';
import { Button, Checkbox } from '@heroui/react'; // Import Checkbox
import { Input } from '@heroui/react';
import { Textarea } from '@heroui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react';
import { Icon } from '@iconify/react';

interface TemplateStep {
  id: string;
  title: string;
  mediaRequired: boolean;
  textReportRequired: boolean;
}

interface Template {
  id: string;
  name: string;
  steps: TemplateStep[];
}

const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentTemplateName, setCurrentTemplateName] = useState('');
  const [currentSteps, setCurrentSteps] = useState<TemplateStep[]>([]);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepMediaRequired, setNewStepMediaRequired] = useState(false); // Changed to boolean
  const [newStepTextReportRequired, setNewStepTextReportRequired] = useState(false); // Changed to boolean

  const addStep = () => {
    if (newStepTitle.trim() === '') {
      alert('Step Title is required!');
      return;
    }
    const newStep: TemplateStep = {
      id: Date.now().toString(), // Simple unique ID for step
      title: newStepTitle,
      mediaRequired: newStepMediaRequired, // Use boolean
      textReportRequired: newStepTextReportRequired, // Use boolean
    };
    setCurrentSteps([...currentSteps, newStep]);
    setNewStepTitle('');
    setNewStepMediaRequired(false);
    setNewStepTextReportRequired(false);
  };

  const deleteStep = (id: string) => {
    setCurrentSteps(currentSteps.filter(step => step.id !== id));
  };

  const moveStep = (id: string, direction: 'up' | 'down') => {
    const index = currentSteps.findIndex(step => step.id === id);
    if (index === -1) return;

    const newSteps = [...currentSteps];
    if (direction === 'up' && index > 0) {
      [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
    } else if (direction === 'down' && index < newSteps.length - 1) {
      [newSteps[index + 1], newSteps[index]] = [newSteps[index], newSteps[index + 1]];
    }
    setCurrentSteps(newSteps);
  };

  const addTemplate = () => {
    if (currentTemplateName.trim() === '') {
      alert('Template Name is required!');
      return;
    }
    if (currentSteps.length === 0) {
      alert('A template must have at least one step!');
      return;
    }

    const newTemplate: Template = {
      id: Date.now().toString(), // Simple unique ID for template
      name: currentTemplateName,
      steps: currentSteps,
    };
    setTemplates([...templates, newTemplate]);
    setCurrentTemplateName('');
    setCurrentSteps([]);
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Template Builder</h1>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Create New Template</h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <Input
            label="Template Name"
            placeholder="Enter template name (e.g., Oil Change Service)"
            value={currentTemplateName}
            onChange={(e) => setCurrentTemplateName(e.target.value)}
            isRequired
          />

          <div className="border p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-medium">Add New Step</h3>
            <Input
              label="Step Title"
              placeholder="Enter step title (required)"
              value={newStepTitle}
              onChange={(e) => setNewStepTitle(e.target.value)}
              isRequired
            />
            <Checkbox
              isSelected={newStepMediaRequired}
              onValueChange={setNewStepMediaRequired}
            >
              Media Required? (Mechanic must upload photos/videos)
            </Checkbox>
            <Checkbox
              isSelected={newStepTextReportRequired}
              onValueChange={setNewStepTextReportRequired}
            >
              Mechanic's Text Report Required? (Mechanic must write a report)
            </Checkbox>
            <Button color="secondary" onPress={addStep}>
              Add Step
            </Button>
          </div>

          {currentSteps.length > 0 && (
            <div className="border p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-medium">Current Template Steps</h3>
              {currentSteps.map((step, index) => (
                <Card key={step.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-3">
                  <div className="flex-1">
                    <p className="font-semibold">Step {index + 1}: {step.title}</p>
                    <p className="text-sm text-gray-500">Media Required: {step.mediaRequired ? 'Yes' : 'No'}</p>
                    <p className="text-sm text-gray-500">Text Report Required: {step.textReportRequired ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <Button isIconOnly variant="light" size="sm" onPress={() => moveStep(step.id, 'up')} isDisabled={index === 0}>
                      <Icon icon="lucide:arrow-up" width={18} />
                    </Button>
                    <Button isIconOnly variant="light" size="sm" onPress={() => moveStep(step.id, 'down')} isDisabled={index === currentSteps.length - 1}>
                      <Icon icon="lucide:arrow-down" width={18} />
                    </Button>
                    <Button isIconOnly variant="light" color="danger" size="sm" onPress={() => deleteStep(step.id)}>
                      <Icon icon="lucide:trash" width={18} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardBody>
        <CardFooter>
          <Button color="primary" onPress={addTemplate} isDisabled={currentSteps.length === 0 || currentTemplateName.trim() === ''}>
            Save Template
          </Button>
        </CardFooter>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Existing Templates</h2>
      {templates.length === 0 ? (
        <p>No templates created yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{template.name}</h3>
                <Button isIconOnly variant="light" color="danger" size="sm" onPress={() => deleteTemplate(template.id)}>
                  <Icon icon="lucide:trash" width={18} />
                </Button>
              </CardHeader>
              <CardBody className="space-y-2">
                {template.steps.map((step, index) => (
                  <div key={step.id} className="border-l-2 border-primary-300 pl-3">
                    <p className="font-semibold">Step {index + 1}: {step.title}</p>
                    <p className="text-sm text-gray-500">Media Required: {step.mediaRequired ? 'Yes' : 'No'}</p>
                    <p className="text-sm text-gray-500">Text Report Required: {step.textReportRequired ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;

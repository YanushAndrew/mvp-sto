import React, { useState } from 'react';
import { Button, Checkbox } from '@heroui/react';
import { Input } from '@heroui/react';
import { Textarea } from '@heroui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence

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
  const [newStepMediaRequired, setNewStepMediaRequired] = useState(false);
  const [newStepTextReportRequired, setNewStepTextReportRequired] = useState(false);

  const addStep = () => {
    if (newStepTitle.trim() === '') {
      alert('Step Title is required!');
      return;
    }
    const newStep: TemplateStep = {
      id: Date.now().toString(),
      title: newStepTitle,
      mediaRequired: newStepMediaRequired,
      textReportRequired: newStepTextReportRequired,
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
      id: Date.now().toString(),
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
              <div className="relative pl-6"> {/* Added relative positioning and padding for line */}
                <AnimatePresence initial={false}>
                  {currentSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 last:mb-0 relative"
                    >
                      {/* Vertical line */}
                      {index < currentSteps.length - 1 && (
                        <div className="absolute left-2.5 top-6 bottom-[-16px] w-0.5 bg-primary-300"></div>
                      )}
                      {/* Node dot */}
                      <div className="absolute left-0 top-2.5 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <Card className="ml-6 p-3"> {/* Adjusted margin-left to align with dot */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                          <div className="flex-1">
                            <p className="font-semibold">{step.title}</p>
                            <p className="text-sm text-gray-500">Media Required: {step.mediaRequired ? '✔' : '✖'}</p>
                            <p className="text-sm text-gray-500">Text Report Required: {step.textReportRequired ? '✔' : '✖'}</p>
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
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
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
                <div className="relative pl-6"> {/* Added relative positioning and padding for line */}
                  {template.steps.map((step, index) => (
                    <div key={step.id} className="mb-4 last:mb-0 relative">
                      {/* Vertical line */}
                      {index < template.steps.length - 1 && (
                        <div className="absolute left-2.5 top-6 bottom-[-16px] w-0.5 bg-primary-300"></div>
                      )}
                      {/* Node dot */}
                      <div className="absolute left-0 top-2.5 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="ml-6 p-3 border rounded-lg"> {/* Adjusted margin-left and added border for visual separation */}
                        <p className="font-semibold">{step.title}</p>
                        <p className="text-sm text-gray-500">Media Required: {step.mediaRequired ? '✔' : '✖'}</p>
                        <p className="text-sm text-gray-500">Text Report Required: {step.textReportRequired ? '✔' : '✖'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;

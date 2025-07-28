'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  Camera, 
  Leaf, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  LogOut,
  RefreshCw,
  Download,
  Eye,
  TrendingUp
} from 'lucide-react';

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  treatment: string;
  prevention: string;
  status: 'healthy' | 'diseased';
}

export default function Dashboard() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      startAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setResult(null);

    // Simulate AI analysis with progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          // Simulate detection result
          setResult({
            disease: 'Leaf Spot Disease',
            confidence: 87,
            severity: 'Medium',
            treatment: 'Apply copper-based fungicide every 2 weeks. Remove affected leaves and improve air circulation.',
            prevention: 'Avoid overhead watering, ensure proper spacing between plants, and maintain good air circulation.',
            status: 'diseased'
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Areca AI Dashboard
                </h1>
                <p className="text-sm text-gray-600">Plant Health Detection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-5 h-5" />
                <span className="text-sm">John Doe</span>
              </div>
              <Button variant="outline" size="sm" className="text-gray-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Scans</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Healthy Plants</p>
                    <p className="text-2xl font-bold text-green-600">18</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Diseases Found</p>
                    <p className="text-2xl font-bold text-red-600">6</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Accuracy Rate</p>
                    <p className="text-2xl font-bold text-purple-600">95%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-green-600" />
                  <span>Upload Plant Photo</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    isDragOver 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded plant" 
                        className="max-w-full h-48 object-cover rounded-lg mx-auto shadow-lg"
                      />
                      <div className="flex space-x-2 justify-center">
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          size="sm"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload New
                        </Button>
                        <Button 
                          onClick={() => {
                            setUploadedImage(null);
                            setResult(null);
                            setAnalysisProgress(0);
                          }}
                          variant="outline"
                          size="sm"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Drop your plant photo here
                        </h3>
                        <p className="text-gray-600 mb-4">
                          or click to browse from your device
                        </p>
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Choose Photo
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Supported formats: JPG, JPEG, PNG (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                />

                {/* Analysis Progress */}
                {isAnalyzing && (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="w-5 h-5 text-green-600 animate-spin" />
                      <span className="text-sm font-medium text-gray-700">
                        Analyzing your plant...
                      </span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                    <p className="text-xs text-gray-500 text-center">
                      {analysisProgress}% Complete
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span>Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {!result && !isAnalyzing && (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Ready for Analysis
                    </h3>
                    <p className="text-gray-500">
                      Upload a photo to get started with AI-powered plant health detection
                    </p>
                  </div>
                )}

                {result && (
                  <div className="space-y-6">
                    {/* Status Alert */}
                    <Alert className={result.status === 'healthy' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
                      <div className="flex items-center">
                        {result.status === 'healthy' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                        )}
                        <AlertDescription className="font-medium">
                          {result.status === 'healthy' ? 'Plant appears healthy!' : 'Disease detected in your plant'}
                        </AlertDescription>
                      </div>
                    </Alert>

                    {/* Detection Details */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">Detected Condition</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
                          {result.severity} Severity
                        </span>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">{result.disease}</h5>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-gray-600">Confidence:</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" 
                              style={{ width: `${result.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{result.confidence}%</span>
                        </div>
                      </div>

                      {/* Treatment */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Treatment Recommendations</h5>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-800">{result.treatment}</p>
                        </div>
                      </div>

                      {/* Prevention */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Prevention Tips</h5>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm text-green-800">{result.prevention}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-4">
                        <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <User className="w-4 h-4 mr-2" />
                          Consult Expert
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}